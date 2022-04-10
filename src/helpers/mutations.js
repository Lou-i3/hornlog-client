import { gql } from "@apollo/client";

export const NewHookMutation = gql `
    mutation NewHookMutation($data: HookCreateInput!) {
        addHook(data: $data) {
         
            id
        }
    }
    `;

export const EditHookMutation = gql `
mutation EditHookMutation($data: HookUpdateInput!) {
    editHook(data: $data) {
     
        id
    }
}
`;