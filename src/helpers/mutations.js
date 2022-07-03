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

export const DeletePartnerMutation = gql `
mutation DeletePartnerMutation($id: Int!) {
    deletePartner(id: $id) {
        id
    }
}
`;

export const DeleteHookMutation = gql `
mutation DeleteHookMutation($id: Int!) {
    deleteHook(id: $id) {
        id
    }
}
`;