import { TestBed } from '@angular/core/testing';
import { AgendaComponent } from './agenda.component';
import { PIXELS_PER_MINUTE } from './agenda-timeline';

describe('Agenda initial scroll and date changes', () => {
  const date = '2026-11-25';
  const period = (day:string, time:string) => {
    const start = `${day}T${time}:00-03:00`;
    return {start,end:new Date(Date.parse(start)+30*60_000).toISOString()};
  };
  async function setup() {
    const fixture = TestBed.createComponent(AgendaComponent);
    for (const [key,value] of Object.entries({dateInputId:'agenda-test-date',date,view:'7',zone:'America/Argentina/Buenos_Aires',
      now:Date.parse(date+'T16:55:00-03:00'),availability:[{date,slots:[period(date,'09:00')]}],bookings:[],
      allowSlot:():boolean=>true,bookingLabel:():string=> 'Confirmado'})) fixture.componentRef.setInput(key,value);
    fixture.detectChanges(); await fixture.whenStable();
    const board = fixture.nativeElement.querySelector('.calendar-board') as HTMLElement;
    return {fixture,board,page:fixture.componentInstance};
  }

  it('opens at the morning slots even when today is in the week and it is already late', async () => {
    const {board} = await setup();
    expect(board.scrollTop).toBe(0);
  });

  it('focuses the selected day instead of the current hour or another day in the week', async () => {
    const {fixture,board,page} = await setup();
    const tomorrow = '2026-11-26';
    fixture.componentRef.setInput('availability', [{date,slots:[period(date,'09:00')]},{date:tomorrow,slots:[period(tomorrow,'11:00')]}]);
    fixture.componentRef.setInput('date',tomorrow);
    fixture.detectChanges(); await fixture.whenStable();
    expect(board.scrollTop).toBe((11*60-page.timeline().from-30)*PIXELS_PER_MINUTE);
    fixture.componentRef.setInput('date',date);
    fixture.detectChanges(); await fixture.whenStable();
    expect(board.scrollTop).toBe(0);
  });

  it('includes reservations without free slots and supports the expanded 24-hour view', async () => {
    const {fixture,board} = await setup();
    fixture.componentRef.setInput('availability', []);
    fixture.componentRef.setInput('bookings', [{...period(date,'07:00'),id:'patient-reservation',status:'CONFIRMED',contactName:'Paciente'}]);
    fixture.componentRef.setInput('view','1');
    fixture.componentInstance.fullDay.set(true);
    fixture.detectChanges(); await fixture.whenStable();
    expect(board.scrollTop).toBe((7*60-30)*PIXELS_PER_MINUTE);
  });

  it('does not recenter on the clock while reading the agenda or refreshing unchanged data', async () => {
    const {fixture,board} = await setup();
    board.scrollTop = 500;
    fixture.componentRef.setInput('now',Date.parse(date+'T17:01:00-03:00'));
    fixture.componentRef.setInput('availability', [{date,slots:[period(date,'09:00')]}]);
    fixture.detectChanges(); await fixture.whenStable();
    expect(board.scrollTop).toBe(500);
  });

  it('waits for loading to finish before selecting the initial position', async () => {
    const {fixture,board,page} = await setup();
    board.scrollTop = 400;
    fixture.componentRef.setInput('loading',true);
    fixture.componentRef.setInput('date','2026-11-26');
    fixture.componentRef.setInput('availability', [{date:'2026-11-26',slots:[period('2026-11-26','10:00')]}]);
    fixture.detectChanges(); await fixture.whenStable();
    expect(board.scrollTop).toBe(400);
    fixture.componentRef.setInput('loading',false);
    fixture.detectChanges(); await fixture.whenStable();
    expect(board.scrollTop).toBe((10*60-page.timeline().from-30)*PIXELS_PER_MINUTE);
  });
});
