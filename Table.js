const Table = {
  "ContratctosCount": 150, // User Input
  "SeftEventPer": 0,
"IndustryAverage": {
  "InjWithC": 0.0302,
  "FatWithC": 0.0001
},
"SelfManaged": {
  InjWithC(){
          return Table.IndustryAverage.InjWithC * (1 - Table.SeftEventPer/100)
      },
  "FatWithC": 0.0001
},
"CostPerEvent": {
  "InjWithC": 92700,
  "FatWithC": 707320
},
"AnnualizedCost": {
  InjWithC(){
          return Table.SelfManaged.InjWithC()*
              Table.CostPerEvent.InjWithC*
              Table.ContratctosCount
      },
  "FatWithC": 707320
}
}