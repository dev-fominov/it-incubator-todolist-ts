type StateType = {
	age: number
	childrenCount: number
	name: string
}

type ActionType = {
	type: string
	[key:string]: any
}

export const userReduser = (state: StateType, action: ActionType) => {
	switch(action.type) {
		case '111':

		case '222':

		default:
			throw new Error("I don't understand this action type")
	}
}