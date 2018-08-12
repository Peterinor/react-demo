var userRepo = require('../repo.js').User;
const uuidv1 = require('uuid/v1');

var saveToDb = async function (ctx) {
    var user = ctx.request.body;

    return new Promise((resolve, reject) => {
        if (!user) {
            return resolve(false);
        }
        if (!user.name) {
            return resolve(false);
        }
        var id = user.id;
        if (id) {
            //edit
            userRepo.update({
                id: id,
                name: user.name,
                birth: user.birth
            }, {
                    where: {
                        id: id
                }
            }).then(() => {
                resolve(true);
            }).catch(function (err) {
                console.log(err.message);
                resolve(false);
            });
        } else {
            userRepo.create({
                id: uuidv1(),
                name: user.name,
                birth: user.birth
            }).then(() => {
                console.log('inserted ok');
                resolve(true);
            }).catch(function (err) {
                console.log('inserted error');
                console.log(err.message);
                resolve(false);
            });
        }
    });
};

module.exports = {
    get: {
        list: async ctx => {
            ctx.state.title = 'users';

            var users = await userRepo.findAll();
            ctx.state.users = users;

            ctx.render('user/list');
        },

        add: async ctx => {
            ctx.state.title = 'Add';
            ctx.state.errMsg = ctx.cache.get('prompt') || '';
            ctx.render('user/add_edit');
        },

        edit: async ctx => {
            if (!ctx.query.id) ctx.redirect('/user/list');
            var id = ctx.query.id;
            if (!id) ctx.redirect('/user/list');
            ctx.state.title = 'Edit';

            var users = await userRepo.findAll({ where: { id: id } });
            ctx.state.user = users[0];
            ctx.render('user/add_edit');
        }
    },

    post: {
        save: async ctx => {
            var user = ctx.request.body;
            //save to db
            var success = await saveToDb(ctx);
            if (success) {
                ctx.redirect('/user/list');
            } else {
                if (user.OriginPage === 'Add') {
                    ctx.redirect('/user/add');
                } else {
                    ctx.redirect('/user/edit?id=' + user.id);
                }
            }
        },
        delete: async ctx => {
            var user = ctx.request.body;
            if (Object.keys(user).length === 0) ctx.redirect('/user/list');
            var id = user.id;
            var result = await userRepo.destroy({ where: { id: id } });
            if (result != 1) {
                ctx.cache.set('prompt', 'failed to delete the raw');
            }
            ctx.redirect('/user/list');
        }

    }
}