enum Party {
  REPUBLICAN = "Republican",
  DEMOCRAT = "Democrat",
  LIBERTARIAN = "Libertarian",
  INDEPENDENT = "Independent",
  GREEN = "Green",
}

enum PartyAbbreviation {
  REPUBLICAN = "R",
  DEMOCRAT = "D",
  LIBERTARIAN = "L",
  INDEPENDENT = "I",
  GREEN = "G",
}

const partyToAbbreviation = {
  [Party.REPUBLICAN]: PartyAbbreviation.REPUBLICAN,
  [Party.DEMOCRAT]: PartyAbbreviation.DEMOCRAT,
  [Party.LIBERTARIAN]: PartyAbbreviation.LIBERTARIAN,
  [Party.INDEPENDENT]: PartyAbbreviation.INDEPENDENT,
  [Party.GREEN]: PartyAbbreviation.GREEN,
}

export default Party;
export { partyToAbbreviation };