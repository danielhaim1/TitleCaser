import countriesAndCodes from "../geography/list-countries-and-codes.json";
import demonyms from "../geography/list-demonyms.json";
import religiousGroups from "../religion/list-religious-groups.json";
import brandNames from "../names/list-brand-names.json";
import academicTimeTerms from "./list-academic-time-terms.json";
import businessFinanceLegalTerms from "./list-business-finance-legal-terms.json";
import ecommerceDigitalTerms from "./list-ecommerce-digital-terms.json";
import marketingDigitalTerms from "./list-marketing-digital-terms.json";
import militaryDefenseTerms from "./list-military-defense-terms.json";
import specializedGeneralTerms from "./list-specialized-general-terms.json";
import technologyComputingTerms from "./list-technology-computing-terms.json";

const geographyCodesAndNames = {
  ...countriesAndCodes,
  demonyms,
  religiousGroups,
};

export {
  academicTimeTerms,
  brandNames,
  businessFinanceLegalTerms,
  ecommerceDigitalTerms,
  geographyCodesAndNames,
  marketingDigitalTerms,
  militaryDefenseTerms,
  specializedGeneralTerms,
  technologyComputingTerms,
};

export const curatedDataList = [
  brandNames,
  businessFinanceLegalTerms,
  ecommerceDigitalTerms,
  geographyCodesAndNames,
  marketingDigitalTerms,
  specializedGeneralTerms,
  technologyComputingTerms,
  academicTimeTerms,
  militaryDefenseTerms,
];

export const englishTermDataList = curatedDataList;
