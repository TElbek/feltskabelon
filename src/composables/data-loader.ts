import api from '@/apijson'
import { useDataStore } from '@/stores/dataStore'

export function useDataLoader() {
    async function loadJSONData(): Promise<void> {
        const formularStore = useDataStore();

        await Promise.all([
            api.get('formularSkabelon.json').then(res =>
                formularStore.setformularSkabelonListe(res.data)
            ),
            api.get('formularSkabelonNavn.json').then(res =>
                formularStore.setformularSkabelonNavnListe(res.data)
            ),
            api.get('formularSkabelonFelt.json').then(res =>
                formularStore.setformularSkabelonFeltListe(res.data)
            ),
            api.get('maerkningsScenarie.json').then(res =>
                formularStore.setMaerkningsScenarieListe(res.data)
            ),
            api.get('maerkningsFormularFelt.json').then(res =>
                formularStore.setMaerkningsFormularFeltListe(res.data)
            ),
            api.get('licensHaver.json').then(res =>
                formularStore.setLicenshaverListe(res.data)
            ),
        ])
    }

    return {
        loadJSONData
    }
}