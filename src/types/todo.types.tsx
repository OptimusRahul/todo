export type STATUS = 'PENDING' | 'COMPLETED';

export type COLOR = '#fbff0052' | '#00ff1f52';

export type PRIORITY = 'HIGH' | 'MEDIUM' | 'LOW';

export type TODO_APP_STATUS = { action: STATUS, color: COLOR };

export type TODO_UPDATE_OPTION = 'STATUS_UPDATE' | 'TASK_UPDATE';

export interface IConfig {
    APP_NAME: string;
    TODO_STATUS: {
        [key:string]: TODO_APP_STATUS
    };
}

export interface INewTodo {
    id: number;
    task: string;
}

export interface ITodo {
    id: string;
    task: string;
    date: Date;
    status: TODO_APP_STATUS;
    priority: PRIORITY;
}