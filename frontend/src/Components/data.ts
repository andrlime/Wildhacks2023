export const subjects = [
    {value: "JOUR", label: "Journalism"},
    {value: "CS", label: "Computer Science"},
    {value: "CE", label: "Computer Engineering"},
    {value: "EE", label: "Electrical Engineering"},
    {value: "EA", label: "Engineering Analysis"},
    {value: "PHYS", label: "Biology"},
    {value: "CHEM", label: "Chemistry"},
    {value: "BIO", label: "Biology"},
    {value: "ENV_SCI", label: "Environmental Science"},
    {value: "SOC", label: "Sociology"},
    {value: "INTL_ST", label: "International Studies"},
    {value: "CLUB", label: "Extracurricular Activity"}
].sort((a,b) => a.value.localeCompare(b.value));

export const buildings = [
    {value: "norris", label: "Norris University Center"},
    {value: "fisk", label: "Fisk Hall"},
    {value: "locy", label: "Locy Hall"},
    {value: "harris", label: "Harris Hall"},
    {value: "univ", label: "University Hall"},
    {value: "lunt", label: "Lunt Hall"},
    {value: "allencenter", label: "Allen Center"},
    {value: "pancoe", label: "Pancoe Life Sciences Pavilion"},
    {value: "tech", label: "Technological Institute"},
    {value: "annenberg", label: "Annenberg Hall"},
    {value: "cahn", label: "Cahn Auditorium"},
    {value: "searle", label: "Searle Hall"},
    {value: "ford", label: "Ford Design Center"},
    {value: "mudd", label: "Mudd Library"},
    {value: "kresge", label: "Kresge Hall"},
    {value: "swift", label: "Swift Hall"},
].sort((a,b) => a.value.localeCompare(b.value));

export const getBuildingName = (str: string) => {
    for(let i of buildings) {
        if(i.value === str) {
            return i.label
        }
    }

    return "UNKNOWN LOCATION";
}

// "African Studies" 
// "American Studies" 
// "Anthropology" 
// "Applied Math" 
// "Architectural Engineering" 
// "Art History" 
// "Asian American Studies" 
// "Asian Humanities" 
// "Asian Languages and Cultures" 
// "Biology" 
// "Biomedical Engineering" 
// "Chemical Engineering" 
// "Chemistry" 
// "Civil Engineering" 
// "Classics" 
// "Cognitive Science" 
// "Communications" 
// "Computer Engineering" 
// "Computer Science" 
// "Dance" 
// "Data Science" 
// "Earth and Planetary Sciences" 
// "Economics" 
// "Electrical Engineering" 
// "Creative Writing" 
// "English Literature" 
// "Environmental Engineering" 
// "Environmental Policy and Culture" 
// "French" 
// "Gender Studies" 
// "Music, all" 
// "Geography" 
// "German" 
// "Global Health" 
// "Greek" 
// "History" 
// "Humanities" 
// "IEMS" 
// "ISP" 
// "International Studies" 
// "Italian" 
// "Jewish Studies" 
// "Journalism" 
// "Kellogg Certificate" 
// "Latin" 
// "Latin American Studies" 
// "Leadership" 
// "Learning Sciences" 
// "Legal Studies" 
// "Linguistics" 
// "MaDE" 
// "Materials Science"
// "MMSS"
// "Math"
// "MechE"
// "MENA Studies"
// "Native American Studies"
// "Neuroscience"
// "Performance Studies"
// "Philosophy"
// "Physics"
// "Political Science"
// "Russian"
// "Segal Design Institute"
// "Social Policy"
// "Sociology"
// "Spanish"
// "Statistics"
// "Theatre"
// "RTVF"
// "World Literature"