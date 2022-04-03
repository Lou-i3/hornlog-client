import { gql } from '@apollo/client';


export const ACCESSIBLE_GENDERS_QUERY = gql `
    query ACCESSIBLE_GENDERS_QUERY {
        accessibleGenders {
            id
            label
        }
    }
    `;


export const SEXUALITIES_QUERY = gql `
query SEXUALITIES_QUERY {
    sexualities
}
`;

export const POSITIONS_QUERY = gql `
query POSITIONS_QUERY {
    sexPositions
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