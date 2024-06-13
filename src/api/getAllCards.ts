import axios from 'axios';
import {Companies} from './endpoints.ts';

export interface LoyaltyLevelParams {
    number: number;
    name: string;
    requiredSum: number;
    markToCash: number;
    cashToMark: number;
}

export interface CompanyParams {
    company?: {companyId: string};
    customerMarkParameters?: {
        loyaltyLevel: LoyaltyLevelParams;
        mark: number;
    };
    mobileAppDashboard: {
        companyName: string;
        logo: string;
        accentColor: string;
        backgroundColor: string;
        cardBackgroundColor: string;
        highlightTextColor: string;
        mainColor: string;
        textColor: string;
    };
}

export const getAllCards = async (offset: number) => {
    return await axios.post(Companies.getAllCompanies, {
        offset,
        limit: 10
    });
};
