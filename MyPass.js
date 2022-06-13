const input = ["Australia/USD",
    150,
    "Global Enterprise (Multi Country)",
    "Basic workforce compliance tracking (e.g. Spreadsheets)",
    "Service Provider"]


function Calculate(arrInput) {

    const input = arrInput

    const PriceList = {
        "Australia/AUD": [1, "AUD"],
        "Australia/USD": [0.78, "USD"],
        "salary_annum": 80000,
        salary_hour() {
            return this.salary_annum / 52 / 38
        },
        costMultiplier: {
            "Single Location": 1,
            "Multi-Location (2-5 sites)": 1.2,
            "Enterprise (5+ sites)": 1.5,
            "Global Enterprise (Multi Country)": 2.5,
        },
        siteCost: {
            "Single Location": 30000,
            "Multi-Location (2-5 sites)": 120000,
            "Enterprise (5+ sites)": 180000,
            "Global Enterprise (Multi Country)": 500000,
        },
        "Basic workforce compliance tracking (e.g. Spreadsheets)": 2,
        "In-house software solution (maintain your own database)": 1.7,
        "Traditional 3rd party contractor management software (e.g. ISNetworld)": 1.3,
        priceRange: [
            { low: 1, high: 4, value: 595 },
            { low: 5, high: 19, value: 1560 },
            { low: 20, high: 49, value: 4200 },
            { low: 50, high: 99, value: 8750 },
            { low: 100, high: 199, value: 17000 },
            { low: 200, high: 499, value: 39000 },
            { low: 500, high: Infinity, value: 0 }
        ]
    }

    const getValuefromRangeTable = (count) => {
        let result = PriceList.priceRange.find(item => {
            return item.low <= count && item.high >= count
        })
        if (result.high == Infinity)
            return count * 80
        else
            return result.value
    }

    const selfManagedSafetyCosts = {
        industryAverage: {
            injuries: 288300 / 477600 * 0.05,
            fatalities: 0.0001
        },
        selfManaged: {
            injuries() {
                return selfManagedSafetyCosts.industryAverage.injuries * (1 - 0.0)
            },
            fatalities() {
                return selfManagedSafetyCosts.industryAverage.fatalities * (1 - 0.0)
            }
        },
        costperEvent: {
            injuries: 92700,
            fatalities: 707320
        },
        annualCost: {
            injuries() {
                return selfManagedSafetyCosts.selfManaged.injuries() * selfManagedSafetyCosts.costperEvent.injuries * input[1]
            },
            fatalities() {
                return selfManagedSafetyCosts.selfManaged.fatalities() * selfManagedSafetyCosts.costperEvent.fatalities * input[1]
            }
        },
        TotalAvgCost() {
            return selfManagedSafetyCosts.annualCost.injuries() + selfManagedSafetyCosts.annualCost.fatalities()
        },
        TotalSafetyEventCost() {
            const price = PriceList[input[0]]
            return `${price[1]} ${parseInt(selfManagedSafetyCosts.TotalAvgCost() * price[0]).toLocaleString('en')}`
        }
    }

    const MyPassSafetyCosts = {
        industryAverage: {
            injuries: 288300 / 477600 * 0.05,
            fatalities: 0.0001
        },
        myPass: {
            injuries() {
                return MyPassSafetyCosts.industryAverage.injuries * (1 - 0.6)
            },
            fatalities() {
                return MyPassSafetyCosts.industryAverage.fatalities * (1 - 0.6)
            }
        },
        costperEvent: {
            injuries: 92700,
            fatalities: 707320
        },
        annualCost: {
            injuries() {
                return MyPassSafetyCosts.myPass.injuries() * MyPassSafetyCosts.costperEvent.injuries * input[1]
            },
            fatalities() {
                return MyPassSafetyCosts.myPass.fatalities() * MyPassSafetyCosts.costperEvent.fatalities * input[1]
            }
        },
        TotalAvgCost() {
            return MyPassSafetyCosts.annualCost.injuries() + MyPassSafetyCosts.annualCost.fatalities()
        },
        TotalSafetyEventCost() {
            const price = PriceList[input[0]]
            return `${price[1]} ${parseInt(MyPassSafetyCosts.TotalAvgCost() * price[0]).toLocaleString('en')}`
        }
    }

    const selfManagedSCQCosts = {
        industryAverage: {
            documentCollection() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]]
            },
            AssessmentValidation() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]]
            },
            documentMonitoring() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]]
            },
            contractorSupport() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]] * 2
            }
        },
        selfManaged: {
            documentCollection() {
                return selfManagedSCQCosts.industryAverage.documentCollection() * (1 - 0.0)
            },
            AssessmentValidation() {
                return selfManagedSCQCosts.industryAverage.AssessmentValidation() * (1 - 0.0)
            },
            documentMonitoring() {
                return selfManagedSCQCosts.industryAverage.documentMonitoring() * (1 - 0.0)
            },
            contractorSupport() {
                return selfManagedSCQCosts.industryAverage.contractorSupport() * (1 - 0.0)
            }
        },
        annualCost: {
            documentCollection() {
                return selfManagedSCQCosts.selfManaged.documentCollection() * input[1]
            },
            AssessmentValidation() {
                return selfManagedSCQCosts.selfManaged.AssessmentValidation() * input[1]
            },
            documentMonitoring() {
                return selfManagedSCQCosts.selfManaged.documentMonitoring() * input[1]
            },
            contractorSupport() {
                return selfManagedSCQCosts.selfManaged.contractorSupport() * input[1]
            }
        },
        TotalAvgCost() {
            return selfManagedSCQCosts.annualCost.documentCollection() +
                selfManagedSCQCosts.annualCost.AssessmentValidation() +
                selfManagedSCQCosts.annualCost.documentMonitoring() +
                selfManagedSCQCosts.annualCost.contractorSupport()
        },
        Total() {
            const price = PriceList[input[0]]
            return `${price[1]} ${parseInt(selfManagedSCQCosts.TotalAvgCost() * price[0]).toLocaleString('en')}`
        }
    }

    const MyPassSCQCosts = {
        industryAverage: {
            documentCollection() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]]
            },
            AssessmentValidation() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]]
            },
            documentMonitoring() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]]
            },
            contractorSupport() {
                return PriceList.salary_hour() * PriceList.costMultiplier[input[2]] * PriceList[input[3]] * 2
            }
        },
        mypass: {
            documentCollection() {
                return MyPassSCQCosts.industryAverage.documentCollection() * (1 - 0.5)
            },
            AssessmentValidation() {
                return MyPassSCQCosts.industryAverage.AssessmentValidation() * (1 - 0.5)
            },
            documentMonitoring() {
                return MyPassSCQCosts.industryAverage.documentMonitoring() * (1 - 0.5)
            },
            contractorSupport() {
                return MyPassSCQCosts.industryAverage.contractorSupport() * (1 - 0.5)
            }
        },
        annualCost: {
            documentCollection() {
                return MyPassSCQCosts.mypass.documentCollection() * input[1]
            },
            AssessmentValidation() {
                return MyPassSCQCosts.mypass.AssessmentValidation() * input[1]
            },
            documentMonitoring() {
                return MyPassSCQCosts.mypass.documentMonitoring() * input[1]
            },
            contractorSupport() {
                return MyPassSCQCosts.mypass.contractorSupport() * input[1]
            }
        },
        TotalAvgCost() {
            return MyPassSCQCosts.annualCost.documentCollection() +
                MyPassSCQCosts.annualCost.AssessmentValidation() +
                MyPassSCQCosts.annualCost.documentMonitoring() +
                MyPassSCQCosts.annualCost.contractorSupport()
        },
        Total() {
            const price = PriceList[input[0]]
            return `${price[1]} ${parseInt(MyPassSCQCosts.TotalAvgCost() * price[0]).toLocaleString('en')}`
        }
    }

    const selfManagedAdditionalCosts = {
        productionDowntime() {
            return 150000 * input[1] * selfManagedSafetyCosts.selfManaged.injuries() * 4 / 24 // 150000 make editable
        },
        retrainingWorker() {
            return input[1] / 10 * 1500
        },
        CurrentConstractorManagementSystem: 250000, // 250000 Make Editable
        TotalAdditional() {
            return selfManagedAdditionalCosts.productionDowntime() +
                selfManagedAdditionalCosts.retrainingWorker() +
                selfManagedAdditionalCosts.CurrentConstractorManagementSystem
        },
        Total() {
            const price = PriceList[input[0]]
            return `${price[1]} ${parseInt(selfManagedAdditionalCosts.TotalAdditional() * price[0]).toLocaleString('en')}`
        }
    }

    const MyPassAdditionalCosts = {
        annualSubscriptionFee() {
            if (input[4] === "Asset Owner") {
                return PriceList.siteCost[input[2]]
            } else {
                return getValuefromRangeTable(input[1])
            }
        },
        implementationFee() {
            if (input[4] === "Asset Owner") {
                return Math.ceil((MyPassAdditionalCosts.annualSubscriptionFee() * 0.53) / 5000) * 5000
            } else {
                return 0
            }
        },
        qualificationFee() {
            if (input[4] === "Asset Owner") {
                return input[1] * 10 * 4
            } else {
                return 0
            }
        },
        TotalCost() {
            return MyPassAdditionalCosts.annualSubscriptionFee() +
                MyPassAdditionalCosts.implementationFee() +
                MyPassAdditionalCosts.qualificationFee()
        },
        Total() {
            const price = PriceList[input[0]]
            return `${price[1]} ${parseInt(MyPassAdditionalCosts.TotalCost() * price[0]).toLocaleString('en')}`
        }
    }

    const FinalDetails = {
        SafetyCosts: {
            selfManaged: selfManagedSafetyCosts.TotalSafetyEventCost(),
            mypass: MyPassSafetyCosts.TotalSafetyEventCost()
        },
        SupplyChain: {
            selfManaged: selfManagedSCQCosts.Total(),
            mypass: MyPassSCQCosts.Total()
        },
        AdditionalCosts: {
            selfManaged: selfManagedAdditionalCosts.Total(),
            mypass: MyPassAdditionalCosts.Total()
        }
    }

    const SummaryFinal = {
        selfManaged: {
            safetyCost() {
                return selfManagedSafetyCosts.TotalAvgCost() * PriceList[input[0]][0]
            },
            adminCost() {
                return selfManagedSCQCosts.TotalAvgCost() * PriceList[input[0]][0] * (38 / 100)   // 38 should be editable
            },
            nonComplianceCost() {
                return -selfManagedSafetyCosts.TotalAvgCost() * (0.01 + (38 - 99) / 100) * PriceList[input[0]][0]   // 38 should be editable
            },
            otherCost() {
                return selfManagedAdditionalCosts.TotalAdditional() * PriceList[input[0]][0]
            },
            Total() {
                return SummaryFinal.selfManaged.safetyCost() +
                    SummaryFinal.selfManaged.adminCost() +
                    SummaryFinal.selfManaged.nonComplianceCost() +
                    SummaryFinal.selfManaged.otherCost()
            }
        },
        mypass: {
            safetyCost() {
                return MyPassSafetyCosts.TotalAvgCost() * PriceList[input[0]][0]
            },
            adminCost() {
                return MyPassSCQCosts.TotalAvgCost() * PriceList[input[0]][0]
            },
            otherCost() {
                return MyPassAdditionalCosts.TotalCost() * PriceList[input[0]][0]
            },
            Total() {
                return SummaryFinal.mypass.safetyCost() +
                    SummaryFinal.mypass.adminCost() +
                    SummaryFinal.mypass.otherCost()
            }
        },
        savings: {
            safetyCost() {
                return SummaryFinal.selfManaged.safetyCost() - SummaryFinal.mypass.safetyCost()
            },
            adminCost() {
                return SummaryFinal.selfManaged.adminCost() - SummaryFinal.mypass.adminCost()
            },
            otherCost() {
                return SummaryFinal.selfManaged.otherCost()
            },
            Total() {
                return SummaryFinal.selfManaged.Total() - SummaryFinal.mypass.Total()
            }
        }
    }

    const YearViceCost = {
        selfManaged: {
            year1() {
                return SummaryFinal.selfManaged.Total()
            },
            year2() {
                return SummaryFinal.selfManaged.Total()
            },
            year3() {
                return SummaryFinal.selfManaged.Total()
            }
        },
        mypass: {
            year1() {
                return SummaryFinal.mypass.Total()
            },
            year2() {
                return SummaryFinal.mypass.Total() + (-MyPassAdditionalCosts.implementationFee() - MyPassAdditionalCosts.qualificationFee() * 4 / 10) * PriceList[input[0]][0]
            },
            year3() {
                return YearViceCost.mypass.year2()
            }
        },
        savings: {
            year1() {
                return YearViceCost.selfManaged.year1() - YearViceCost.mypass.year1()
            },
            year2() {
                return YearViceCost.selfManaged.year2() - YearViceCost.mypass.year2()
            },
            year3() {
                return YearViceCost.selfManaged.year3() - YearViceCost.mypass.year3()
            }
        }
    }

    const EstimatedCostSavings = PriceList[input[0]][1] + ' ' + (Math.ceil(YearViceCost.savings.year1() + YearViceCost.savings.year2() + YearViceCost.savings.year3())).toLocaleString('en')

    document.querySelector("#estimatedCostSaving").innerHTML = EstimatedCostSavings

}
