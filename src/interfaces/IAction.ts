import { ACTIONS } from "../App"

export default interface IAction {
  type: ACTIONS
  payload: {
    id?: number
    title?: string
    description?: string
  }
}