
import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "databaseSenhas";
const database_version = "1.0";
const database_size = 200000;
const database_displayname = "database of app";

export default class Db {
    initDb() {
        let db;
        return new Promise(resolve => {
            SQLite.echoTest().then(() => {
                SQLite.openDatabase(
                    database_name,
                    database_version,
                    database_displayname,
                    database_size
                ).then(database => {
                    db = database;
                    db.executeSql('select * from senhas').catch((err) => {
                        db.transaction(tx => {
                            tx.executeSql(`
                            create table if not exists senhas ( 
                                id integer primary key autoincrement,
                                titulo text,
                                categoria text,
                                login text,
                                senha text,
                                descricao text,
                                endereco text,
                                nomeBanco text,
                                dono text,
                                adcionadoEm datetime default current_timestamp,
                                imagem blob
                                )`);
                        }).catch(err => {
                            alert(JSON.stringify(err));
                        }
                        )
                    })
                    resolve(db);
                })
            })
        });
    }
    closeDatabase(db) {
        if (db) {
            db.close();
        }
    }
    editSenha(dados) {
        return new Promise(resolve => {
            this.initDb().then(db => {
                db.transaction(tx => {
                    tx.executeSql('UPDATE senhas SET titulo = ?, categoria = ?, login = ?, senha = ?, descricao = ?, nomeBanco = ?, dono = ?, endereco = ? WHERE id = ?',
                        [dados.titulo, dados.categoria, dados.login, dados.senha, dados.descricao, dados.nomeBanco, dados.dono, dados.endereco , dados.id]).then(([tx, results]) => {
                            resolve(results);
                        })
                }).then(() => {
                    this.closeDatabase(db);
                })
            })
        })
    }
    insertSenha(dados) {
        return new Promise(resolve => {
            this.initDb().then(db => {
                db.transaction(tx => {
                    tx.executeSql('INSERT INTO senhas (titulo, categoria, login, senha, descricao, nomeBanco, dono, endereco) VALUES (?,?,?,?,?,?,?,?)',
                        [dados.titulo, dados.categoria, dados.login, dados.senha, dados.descricao, dados.nomeBanco, dados.dono, dados.endereco]).then(([tx, results]) => {
                            resolve(results);
                        })

                }).then(() => {
                    this.closeDatabase(db);
                })
            })
        })
    }


    insertUser(user) {
        return new Promise(resolve => {
            this.initDb().then(db => {
                db.transaction(tx => {
                    tx.executeSql('INSERT INTO user(name, username, password) VALUES (?,?,?)', [user.name, user.username, user.password]).then(([tx, results]) =>
                        resolve(results))
                }).then(() => {

                    this.closeDatabase(db);
                });
            })
        })
    }
    getAllSenhas() {
        return new Promise(resolve => {
            this.initDb().then(db => {
                db.transaction(tx => {
                    tx.executeSql("select * from senhas; ").then(([tx, results]) => {
                        let senhas = [];
                        //      alert(JSON.stringify(results));
                        for (let i = 0; i < results.rows.length; i++) {
                            let row = results.rows.item(i);
                            const { id, adcionadoEm, titulo, categoria, login, senha, descricao, nomeBanco, dono, endereco } = row;
                            senhas.push({ id, adcionadoEm, titulo, categoria, login, senha, descricao, nomeBanco, dono, endereco });
                        }
                        //        alert(JSON.stringify(senhas));
                        resolve(senhas);
                    });
                })
            })
        })
    }
    deleteSenha(id) {
        return new Promise(resolve => {
            this.initDb().then(db => {
                db.transaction(tx => {
                    tx.executeSql('DELETE FROM senhas where id = (?)', [id]).then(([tx, results]) =>
                        resolve(results))
                }).then(() => {

                    this.closeDatabase(db);
                });
            })
        })
    }
    getAllUSers() {
        return new Promise(resolve => {
            this.initDb().then(db => {
                db.transaction(tx => {
                    tx.executeSql("select * from user").then(([tx, results]) => {
                        let users = [];
                        alert(JSON.stringify(results));
                        for (let i = 0; i < results.rows.length; i++) {
                            let row = results.rows.item(i);
                            const { name, username, password } = row;
                            users.push({ name, username, password });
                        }
                        alert(JSON.stringify(users));
                        resolve(users);
                    });
                })
            })
        })
    }
}