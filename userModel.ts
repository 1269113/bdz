
declare var require: any
const mysql = require('mysql2');

export type User = {
    id: number,
    username: string,
    password: string,
    email: string
}
export type StartDest = {
    start:string
}
export type EndDest = {
    end:string
}
export type View = {
    id: string,
    date: string,
    start: string,
    end: string,
    starttime: string,
    endtime: string,
    duration: string,
    price: string,
}
export type Buy = {
    username: string,
    name2: string
}

export type infoList = {
    username: string,
    id: string,
    date: string,
    start: string,
    end: string,
    starttime: string,
    endtime: string,
    duration: string,
    price: string,
}
export type deleteRecord = {
    id: string
}

export class UserModel{
    private conn; //connection to db
    constructor() {
        const pool = mysql.createPool({host: 'localhost', user: 'root', database: 'bdj'});
        this.conn = pool.promise();
    }

    async getStart(): Promise<StartDest[]> {
        const [rows] = await this.conn.query("SELECT DISTINCT start FROM bileti");
        console.log(rows)
        return rows;
    }
    async getEnd(name: string): Promise<EndDest[]> {
        const statement = `SELECT DISTINCT end FROM bileti WHERE start = '${name}'`
        const [rows] = await this.conn.query(statement);
        return rows;
    }
    async View(name: string, name2: string): Promise<View[]>{
        const ViewTicket = `SELECT id,date,start,end,starttime,endtime,duration,price FROM bileti WHERE start = '${name}' AND end = '${name2}' `
        const [rows] = await this.conn.query(ViewTicket)
        console.log(rows)
        return rows
    }
    async Buy(username: string, name2: number): Promise<Buy[]>{
        const BuyTicket = `INSERT INTO list(username, bilet_id) VALUES ( '${username}','${name2}')`
        const [rows] = await this.conn.query(BuyTicket)
        return rows
    }

    async createUser(userDataInput: User): Promise<boolean> {
        let sql = "INSERT INTO users (username, password, email) VALUES(?,?,?)"
        let values = [
            userDataInput.username,
            userDataInput.password,
            userDataInput.email
        ]
        sql = mysql.format(sql, values)
        await this.conn.execute(sql);
        return true;
    }

    async deleteUser(id: number): Promise<boolean> {
        await this.conn.execute("DELETE FROM `users` WHERE id = ?", [id]);
        return true;
    }
    async deleteRecord(id: number): Promise<deleteRecord[]> {
        const statement = `DELETE FROM list WHERE bilet_id = '${id}'`
        const del = await this.conn.query(statement);
        return del;
    }

    async getList(username: string): Promise<infoList> {
        const [rows] = await this.conn.query(`Select list.username,bileti.date, bileti.start, bileti.starttime, bileti.end, bileti.endtime, bileti.duration, bileti.price, bileti.id from list join bileti on list.bilet_id=bileti.id join users ON list.username=users.username WHERE list.username = '${username}'`);
        return rows;
    }
}
