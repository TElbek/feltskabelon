import api from '@/apijson'
import { useDataStore } from '@/stores/dataStore'

export function useDataLoader() {
    async function loadJSONData(): Promise<void> {
        const formularStore = useDataStore();

        await Promise.all([
            api.get('formularSkabelon.json').then(res =>
                formularStore.setFormTemplateList(res.data)
            ),
            api.get('formularSkabelonNavn.json').then(res =>
                formularStore.setFormTemplateNameList(res.data)
            ),
            api.get('formularSkabelonFelt.json').then(res =>
                formularStore.setFormTemplateFieldList(res.data)
            ),
            api.get('maerkningsScenarie.json').then(res =>
                formularStore.setBandingScenarioList(res.data)
            ),
            api.get('maerkningsFormularFelt.json').then(res =>
                formularStore.setBandingFormList(res.data)
            ),
            api.get('licensHaver.json').then(res =>
                formularStore.setLicenseeList(res.data)
            ),
        ])
    }

    return {
        loadJSONData
    }
}