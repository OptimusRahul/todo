import { IConfig } from "../types/todo.types";

export const appConfiguration: IConfig = {
    APP_NAME: 'TODO APP',
    TODO_STATUS: {
        PENDING: { action: 'PENDING', color: '#fbff0052' },
        COMPLETED: { action: 'COMPLETED', color: '#00ff1f52' },
    }
}

export const appMessage = {
    EMPTY_LIST: 'Add a new task to organize your daily schedule'
}

export const apiURL = {
    API_URL: 'https://api.chucknorris.io/jokes/random?category=dev'
}