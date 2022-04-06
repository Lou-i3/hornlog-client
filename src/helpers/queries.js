import { gql } from '@apollo/client';


export const ACCESSIBLE_GENDERS_QUERY = gql `
    query ACCESSIBLE_GENDERS_QUERY {
        accessibleGenders {
            id
            label
        }
    }
    `;

export const MY_PARTNERS_QUERY = gql `
    query MY_PARTNERS_QUERY {
        myPartners {
            id
            person {
                id
                firstName
                lastName
                nickName
                how
                notes
                picture
                gender {
                    id
                    label
                }
                birthday
                nationality
                sexuality
                sexPosition
                contactInfos {
                    id
                    type
                    info
                    designation
                }
            }
            hooks {
                id
                dateTime
            }
            
        }
    }
`;


export const ENUM_VALUES_QUERY = gql `
query ENUM_VALUES_QUERY($enumName: String!) {
    __type(name: $enumName) {
    name
    enumValues {
      name
    }
  }
}
`;