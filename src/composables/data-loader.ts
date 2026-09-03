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
            api.get('bandingScenario.json').then(res =>
                dataStore.setBandingScenarioList(res.data)
            ),
            api.get('bandingForm.json').then(res =>
                dataStore.setBandingFormList(res.data)
            ),
            api.get('licensee.json').then(res =>
                dataStore.setLicenseeList(res.data)
            ),
        ])
    }

    return {
        loadJSONData
    }
}