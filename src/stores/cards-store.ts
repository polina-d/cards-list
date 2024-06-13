import {makeAutoObservable, runInAction} from 'mobx';
import {CompanyParams, getAllCards} from '../api/getAllCards.ts';

class CardsStore {
    cards: CompanyParams[] = [];
    isLoading = false;
    error: unknown = null;
    offset = 0;

    constructor() {
        makeAutoObservable(this);
    }

    addCards = async () => {
        try {
            this.offset += 1;
            this.getCards(this.offset);
        } catch (err) {
            this.error = err || null;
            this.offset -= 1;
        }
    };
    getCards = async (offset: number = 0) => {
        try {
            this.isLoading = true;
            const res = await getAllCards(offset);
            runInAction(() => {
                this.cards = this.cards?.concat(res?.data?.companies);
                this.isLoading = false;
            });
        } catch (error) {
            this.error = error || null;
            this.isLoading = false;
        }
    };
}

export default new CardsStore();
