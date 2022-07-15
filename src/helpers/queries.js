import { gql } from '@apollo/client';


export const ACCESSIBLE_GENDERS_QUERY = gql `
    query ACCESSIBLE_GENDERS_QUERY {
        accessibleGenders {
            id
            label
        }
    }
    `;

export const ME_QUERY = gql `
    query ME_QUERY {
        me {
            id
            createdAt
            updatedAt
            displayName
            username
            email
            role
            
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
                grade
                hookType
            }
            
        }
    }
`;

export const MY_PARTNERS_MINI_QUERY = gql `
    query MY_PARTNERS_MINI_QUERY {
        myPartners {
            id
            person {
                id
                firstName
                lastName
                nickName
                picture
            }   
        }
    }
`;

export const MY_HOOKS_QUERY = gql `
    query MY_HOOKS_QUERY {
        myHooks {
            id
            createdAt
            updatedAt
            hookType
            dateTime
            duration
            orgasm
            porn
            note
            grade
            protected
            sex
            penetration
            pill
            protection
            addToAppleHealth
            mood
            archived
            partners {
                id
                person {
                    id
                    firstName
                    lastName
                    nickName
                    picture
                }
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