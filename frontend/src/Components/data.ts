export const subjects = [
    {value: "APPM", label: "Applied Math"},
    {value: "ARCHE", label: "Architectural Engineering"},
    {value: "ARTHIST", label: "Art History"},
    {value: "ASAM", label: "Asian American Studies"},
    {value: "ASHUM", label: "Asian Humanities"},
    {value: "ASLC", label: "Asian Languages and Cultures"},
    {value: "BIO", label: "Biology"},
    {value: "BME", label: "Biomedical Engineering"},
    {value: "CHE", label: "Chemical Engineering"},
    {value: "CHEM", label: "Chemistry"},
    {value: "CIVE", label: "Civil Engineering"},
    {value: "CLS", label: "Classics"},
    {value: "COGS", label: "Cognitive Science"},
    {value: "COMMS", label: "Communications"},
    {value: "COMPS", label: "Computer Engineering"},
    {value: "CS", label: "Computer Science"},
    {value: "D", label: "Dance"},
    {value: "DS", label: "Data Science"},
    {value: "EPS", label: "Earth and Planetary Sciences"},
    {value: "EC", label: "Economics"},
    {value: "EE", label: "Electrical Engineering"},
    {value: "CRWR", label: "Creative Writing"},
    {value: "ELIT", label: "English Literature"},
    {value: "ENVE", label: "Environmental Engineering"},
    {value: "ENVPC", label: "Environmental Policy and Culture"},
    {value: "FR", label: "French"},
    {value: "GS", label: "Gender Studies"},
    {value: "MS", label: "Music, all"},
    {value: "GEOG", label: "Geography"},
    {value: "DE", label: "German"},
    {value: "GLOBH", label: "Global Health"},
    {value: "GRK", label: "Greek"},
    {value: "HIST", label: "History"},
    {value: "HUM", label: "Humanities"},
    {value: "IEMS", label: "Industrial Engineering and Management"},
    {value: "ISP", label: "Integrated Sciences"},
    {value: "INTLST", label: "International Studies"},
    {value: "ITAL", label: "Italian"},
    {value: "JEWS", label: "Jewish Studies"},
    {value: "JOUR", label: "Journalism"},
    {value: "UGKELLOGG", label: "Undergraduate Kellogg Certificate"},
    {value: "LTN", label: "Latin"},
    {value: "LTNAMS", label: "Latin American Studies"},
    {value: "LEAD", label: "Leadership"},
    {value: "LEARNSCI", label: "Learning Sciences"},
    {value: "LAWUG", label: "Legal Studies"},
    {value: "LING", label: "Linguistics"},
    {value: "MADE", label: "Manufacturing and Design Engineering"},
    {value: "MSE", label: "Materials Science"},
    {value: "MMSS", label: "MMSS"},
    {value: "MATH", label: "Math"},
    {value: "MECHE", label: "Mechanical Engineering"},
    {value: "MENA", label: "Middle Eastern & North African Studies"},
    {value: "NAMST", label: "Native American Studies"},
    {value: "NEURO", label: "Neuroscience"},
    {value: "PERFST", label: "Performance Studies"},
    {value: "PHIL", label: "Philosophy"},
    {value: "PHYS", label: "Physics"},
    {value: "POLISCI", label: "Political Science"},
    {value: "RUS", label: "Russian"},
    {value: "SEGAL", label: "Segal Design Institute"},
    {value: "SESPA", label: "Social Policy"},
    {value: "SOCIO", label: "Sociology"},
    {value: "SPANISH", label: "Spanish"},
    {value: "STATS", label: "Statistics"},
    {value: "THTR", label: "Theatre"},
    {value: "RTVF", label: "Radio, TV, and Film"},
    {value: "WLIT", label: "World Literature"}
].sort((a,b) => a.value.localeCompare(b.value));

export const buildings = [
    {value: "Annenberg", label: "Annenberg Hall"},
    {value: "DeeringLib", label: "Deering Library"},
    {value: "UnivLib", label: "University Library"},
    {value: "Tech", label: "Technological Institute"},
    {value: "NorrisCtr", label: "Norris University Center"},
    {value: "Kresge", label: "Kresge Hall"},
    {value: "Ford", label: "Ford Motor Company Engineering Design Center"},
    {value: "Kellogg", label: "Kellogg Global Hub"},
    {value: "RyanHall", label: "Ryan Hall"},
    {value: "Crowe", label: "Crowe Hall"},
    {value: "Swift", label: "Swift Hall"},
    {value: "Fisk", label: "Fisk Hall"},
    {value: "Scott", label: "Scott Hall"},
    {value: "Levere", label: "Levere Memorial Temple"},
    {value: "RebeccaCrown", label: "Rebecca Crown Center"},
    {value: "AnnieMaySwift", label: "Annie May Swift Hall"},
    {value: "McCormickTrib", label: "McCormick Tribune Center"},
    {value: "BlockMuseum", label: "Mary and Leigh Block Museum of Art"},
    {value: "SPAC", label: "Henry Crown Sports Pavilion and Aquatics Center"},
    {value: "Pancoe", label: "Pancoe Life Sciences Pavilion"},
    {value: "JacobsCtr", label: "Josephine B. and Mortimer J. Jacobs Center"},
    {value: "PickStaiger", label: "Pick-Staiger Concert Hall"},
    {value: "Wirtz", label: "Wirtz Hall"},
    {value: "FrancesSearle", label: "Frances Searle Building"},
    {value: "Mudd", label: "Mudd Library"}
].sort((a,b) => a.value.localeCompare(b.value));

export const getBuildingName = (str: string) => {
    for(let i of buildings) {
        if(i.value === str) {
            return i.label
        }
    }

    return "UNKNOWN LOCATION";
}

export const getSubject = (str: string) => {
    for(let i of subjects) {
        if(i.value === str) {
            return i.label
        }
    }

    return "UNKNOWN SUBJECT";
}
