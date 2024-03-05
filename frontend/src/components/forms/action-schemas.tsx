import { z } from "zod";


const HTTPRequestActionSchema = z.object({
  url: z.string().url(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  headers: z.string().optional().transform((val) => {
    try {
      return val ? JSON.parse(val) : {};
    } catch (error) {
      // TODO: Handle error on SAVE only
      return {};
    }
  }),
  payload: z.string().optional().transform((val) => {
    try {
      return val ? JSON.parse(val) : {};
    } catch (error) {
      // TODO: Handle error on SAVE only
      return {};
    }
  }),
});

interface ActionFieldOption {
  type: "Input" | "Select" | "Textarea";
  options?: string[];
}

interface ActionFieldSchema {
  [key: string]: ActionFieldOption;
}

export interface ActionFieldSchemas {
  [actionType: string]: ActionFieldSchema;
}

const actionFieldSchemas: ActionFieldSchemas = {
  "HTTP Request": {
    url: { type: "Input" },
    method: {
      type: "Select",
      options: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
    headers: { type: "Textarea" },
    payload: { type: "Textarea" },
  },
};

export const getActionSchema = (actionType: string) => {
  switch (actionType) {
    case "HTTP Request":
      return { actionSchema: HTTPRequestActionSchema, actionFieldSchema: actionFieldSchemas["HTTP Request"] };
    // Define and return other action schemas as needed
    default:
      return null; // No schema or UI hints available for the given action type
  }
};
