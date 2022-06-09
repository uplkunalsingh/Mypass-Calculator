// class MyPass {
//     constructor() {
//         this.selfManagedCosts = {
//             industryAverage: {
//                 injuries: 288300 / 477600 * 0.05,
//                 fatalities: 0.0001
//             },
//             selfManaged: {
//                 injuries() {
//                     return this.selfManagedCosts.industryAverage.injuries * (1 - 0.00 / 100)
//                 }
//                 // injuries: this.selfManagedCosts.industryAverage.injuries * (1 - 0.00 / 100),
//                 // fatalities: this.selfManagedCosts.industryAverage.fatalities * (1 - 0.00 / 100)
//             }
//         }
//     }
// }

const input = ["Australia/USD",
    150,
    "Global Enterprise (Multi Country)",
    "Basic workforce compliance tracking (e.g. Spreadsheets)",
    "Service Provider"]

const PriceList = {
    "Australia/AUD": [1, "AUD"],
    "Australia/USD": [0.78, "USD"]
}

const selfManagedCosts = {
    industryAverage: {
        injuries: 288300 / 477600 * 0.05,
        fatalities: 0.0001
    },
    selfManaged: {
        injuries() {
            return selfManagedCosts.industryAverage.injuries * (1 - 0.0)
        },
        fatalities() {
            return selfManagedCosts.industryAverage.fatalities * (1 - 0.0)
        }
    },
    costperEvent: {
        injuries: 92700,
        fatalities: 707320
    },
    annualCost: {
        injuries() {
            return selfManagedCosts.selfManaged.injuries() * selfManagedCosts.costperEvent.injuries * 150
        },
        fatalities() {
            return selfManagedCosts.selfManaged.fatalities() * selfManagedCosts.costperEvent.fatalities * 150
        }
    },
    TotalAvgCost() {
        return selfManagedCosts.annualCost.injuries() + selfManagedCosts.annualCost.fatalities()
    },
    TotalSafetyEventCost() {
        const price = PriceList[input[0]]
        return `${price[1]} ${parseInt(selfManagedCosts.TotalAvgCost() * price[0]).toLocaleString('en')}`
    }
}

const MyPassCosts = {
    industryAverage: {
        injuries: 288300 / 477600 * 0.05,
        fatalities: 0.0001
    },
    myPass: {
        injuries() {
            return MyPassCosts.industryAverage.injuries * (1 - 0.6)
        },
        fatalities() {
            return MyPassCosts.industryAverage.fatalities * (1 - 0.60 / 100)
        }
    },
    costperEvent: {
        injuries: 92700,
        fatalities: 707320
    },
    annualCost: {
        injuries() {
            return MyPassCosts.myPass.injuries() * MyPassCosts.costperEvent.injuries * 150
        },
        fatalities() {
            return MyPassCosts.myPass.fatalities() * MyPassCosts.costperEvent.fatalities * 150
        }
    },
    TotalAvgCost() {
        return MyPassCosts.annualCost.injuries() + MyPassCosts.annualCost.fatalities()
    },
    TotalSafetyEventCost() {
        const price = PriceList[input[0]]
        return `${price[1]} ${parseInt(MyPassCosts.TotalAvgCost() * price[0]).toLocaleString('en')}`
    }
}
console.log(selfManagedCosts.TotalSafetyEventCost());
console.log(MyPassCosts.annualCost.injuries(), MyPassCosts.annualCost.fatalities());