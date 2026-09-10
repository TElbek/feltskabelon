import api from '@/apijson'
import { useDataStore } from '@/stores/dataStore'

export function useDataLoader() {
    async function loadJSONData(): Promise<void> {
        const dataStore = useDataStore();

        await Promise.all([
            api.get('formTemplate.json').then(res =>
                dataStore.setFormTemplateList(res.data)
            ),
            api.get('formTemplateName.json').then(res =>
                dataStore.setFormTemplateNameList(res.data)
            ),
            api.get('formTemplateField.json').then(res =>
                dataStore.setFormTemplateFieldList(res.data)
            ),
            api.get('ringingScenario.json').then(res =>
                dataStore.setRingingScenarioList(res.data)
            ),
            api.get('ringingField.json').then(res =>
                dataStore.setRingingFieldList(res.data)
            ),
            api.get('licensee.json').then(res =>
                dataStore.setLicenseeList(res.data)
            ),            
            api.get('scenarioField.json').then(res => 
                dataStore.setScenarioFieldList(res.data)
            ),
            dataStore.setLicenseeId(1)
        ])
    }

    return {
        loadJSONData
    }
}