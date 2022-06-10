  // Asset Owner

  const inputs = {
    country: ["Australia AUD", "Australia USD"],
    noOfWorkers: 150,
    noOfSites: [
      "Single Location",
      "Multi-Location (2-5 sites)",
      "Enterprise (5+ sites)",
      "Global Enterprise (Multi Country)",
    ],
    currentWorkforceComplianceTool: [
      "Basic workforce compliance tracking (e.g. Spreadsheets)",
      "In-house software solution (maintain your own database)",
      "Traditional 3rd party contractor management software (e.g. ISNetworld)",
    ],
    typeOfOrganization: ["Asset Owner", "Service Provider"],
  };

  let estimatedCostSavingsfor3Years = 21223; // result c

  class resultsTable {
    selfManagedCost = { year1: 2, year2: 7, year3: 33 };
    myPassManagedCost = { year1: 2, year2: 7, year3: 33 };
    savingWithMyPass = {
      year1: this.getSavingsWithMyPass("year1"),
      year2: this.getSavingsWithMyPass("year2"),
      year3: this.getSavingsWithMyPass("year3"),
    };
    safetyCosts = {
      selfManaged: 2121,
      myPassManaged: 2424,
      savings: this.getSavings("safetyCosts"),
    };
    adminCosts  = {
      selfManaged: 2424,
      myPassManaged: 2424,
      savings: this.getSavings("adminCosts"),
    };
    nonComplianceRisk  = {
      selfManaged: 2424,
      myPassManaged: 2424,
      savings: this.getSavings("nonComplianceRisk"),
    };
    programAndOtherCosts  = {
      selfManaged: 2424,
      myPassManaged: 2424,
      savings:this.getSavings("programAndOtherCosts"),
    }
    total = {
      selfManaged: this.getTotalSelfManaged(),
      myPassManaged:this.getTotalMyPass(),
      savings:  this.getTotalSavings(),
    }

    getSavingsWithMyPass(year) {
      return this.selfManagedCost[year] - this.myPassManagedCost[year];
    };
    getTotalSelfManaged(){
      return this.safetyCosts.selfManaged + this.adminCosts.selfManaged + this.nonComplianceRisk.selfManaged;
    };
    getTotalMyPass(){
      return this.safetyCosts.myPassManaged + this.adminCosts.myPassManaged + this.nonComplianceRisk.myPassManaged;
    };
    getTotalSavings(){
      return this.safetyCosts.savings + this.adminCosts.savings + this.nonComplianceRisk.savings;
    };
    getSavings(index){
      return this[index].selfManaged - this[index].myPassManaged
    }

  }