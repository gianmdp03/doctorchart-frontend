import {proofHash,solveProof} from './proof-of-work';
describe('Anonymous proof verification client',()=>{
 it('matches independent SHA256 known vectors',()=>{const hex=(s:string)=>[...proofHash(s)].map(v=>v.toString(16).padStart(2,'0')).join('');expect(hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');expect(hex('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');});
 it('cancels work and rejects an unexpected challenge policy',async()=>{const c=new AbortController();c.abort();await expect(solveProof('token',18,c.signal)).rejects.toThrow('cancelada');await expect(solveProof('token',0,new AbortController().signal)).rejects.toThrow();});
});
