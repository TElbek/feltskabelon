import api from '@/apijson'
import { useDataStore } from '@/stores/dataStore'

export function useDataLoader() {
    async function loadJSONData(): Promise<void> {
        const formularStore = useDataStore();

        await Promise.all([
            api.get('formTemplate.json').then(res =>
                formularStore.setFormTemplateList(res.data)
            ),
            api.get('formTemplateName.json').then(res =>
                formularStore.setFormTemplateNameList(res.data)
            ),
            api.get('formTemplateField.json').then(res =>
                formularStore.setFormTemplateFieldList(res.data)
            ),
            api.get('bandingScenario.json').then(res =>
                formularStore.setBandingScenarioList(res.data)
            ),
            api.get('bandingForm.json').then(res =>
                formularStore.setBandingFormList(res.data)
            ),
            api.get('licensee.json').then(res =>
                formularStore.setLicenseeList(res.data)
            ),
        ])
    }

    return {
        loadJSONData
    }
}