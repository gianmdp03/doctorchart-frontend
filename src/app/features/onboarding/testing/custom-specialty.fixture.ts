import type { WizardDefinition } from '../../../core/models/wizard-definition.model';
// Test-only copy of the backend contract fixture; never used as application defaults.
export const customSpecialtyFixture = {
  "code": "contract_test_xyz",
  "name": "Especialidad ficticia de validación",
  "description": "Solo fixture: nunca se carga en el catálogo ni en el seeder.",
  "definition": {
    "schemaVersion": 1,
    "patientForm": {
      "categories": [
        {
          "key": "new_patient_category",
          "title": "Categoría inédita de prueba",
          "enabled": true,
          "fields": [
            {
              "key": "identity",
              "label": "Nombre completo",
              "type": "TEXT",
              "required": true
            },
            {
              "key": "born",
              "label": "Nacimiento",
              "type": "DATE",
              "required": true
            },
            {
              "key": "consent",
              "label": "Respuesta obligatoria de prueba",
              "type": "BOOLEAN",
              "required": true
            },
            {
              "key": "group",
              "label": "Grupo de prueba",
              "type": "SELECT",
              "required": false,
              "options": [
                {
                  "value": "a",
                  "label": "Grupo A"
                },
                {
                  "value": "b",
                  "label": "Grupo B"
                }
              ]
            }
          ]
        }
      ]
    },
    "encounterForm": {
      "categories": [
        {
          "key": "new_encounter_category",
          "title": "Consulta inédita",
          "enabled": true,
          "fields": [
            {
              "key": "readingA",
              "label": "Lectura A",
              "type": "NUMBER",
              "required": false,
              "minimum": -10,
              "maximum": 100
            },
            {
              "key": "readingB",
              "label": "Lectura B",
              "type": "NUMBER",
              "required": false
            },
            {
              "key": "result",
              "label": "Promedio",
              "type": "FORMULA",
              "required": false,
              "formula": {
                "kind": "CUSTOM",
                "operation": "AVERAGE",
                "inputs": {
                  "a": {
                    "fieldKey": "readingA"
                  },
                  "b": {
                    "fieldKey": "readingB"
                  }
                }
              }
            },
            {
              "key": "notes",
              "label": "Observaciones",
              "type": "TEXTAREA",
              "required": false
            }
          ]
        }
      ]
    },
    "modulesConfig": {
      "MEDICATION_CATALOG": false,
      "AI_ASSISTANT": false,
      "GROWTH_CHARTS": false
    }
  }
} as { code: string; name: string; description: string; definition: WizardDefinition };
