const AuthUser = require('./authUser.model');

exports.createUser = async (req, res) => {
    const user = new AuthUser(req.body)

    try {
        
        const token = await user.generateAuthToken();

        res.status(201).send({ message: 'success', user, token })

    } catch (e) {
        res.send({ message: 'Error', e })
    }
}

exports.getUsersInformation = async (req, res, next) => {
    var userArray = {};

    const users = await AuthUser.find({}, function (err, user) {
        userArray[user._id] = user;
    });


    res.send({ message: 'success', userArray });

};

exports.getUserById = async (req, res) => {
    try {
        const user = await AuthUser.findById({ _id: req.body.id })
        res.send({ message: 'success', user })

    } catch (e) {
        res.status(400).send({ message: 'Error', e })
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await AuthUser.findByEmail(req.params.email)

        res.send({ message: 'success', user })
    } catch (e) {
        res.status(400).send({ message: 'Error', e })
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await AuthUser.findOneAndDelete(req.body.id)
        res.status(200).send()
    } catch (e) {
        res.status(400).send({ message: 'Error' })
    }
};

exports.updateUserAuthInformation = async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['userName', 'password', 'email', 'canAccessPublications', 'canAccessAccount', 'canAccessComments', 'canAccessMyPublications']
    const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates))

    if (!isValidOperation) {

        return res.status(400).send({ error: 'Error' })
    }
    try {
        const user = await AuthUser.findById(req.params.id);

        updates.forEach((update) => user[update] = req.body[update]);

        await user.save(user);
        if (!user) {
            return res.status(404).send({ message: 'Error' })
        }
        res.send(user)
    } catch (e) {
        res.status(400).send({ message: 'Error', e })
    }

};

exports.login = async (req, res) => {
    try {
        const user = await AuthUser.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();

        res.send({ message: 'success', user, token })
    } catch (e) {
        res.status(400).send({ message: 'Error', e })
    }

}

exports.googleLogin = async (req, res) => {
    try {
        const user = await AuthUser.findByEmail(req.params.email)
        let token = ''
        if(user)
        token = await user.generateAuthToken();
        
        res.send({ message: 'success', user, token })
    } catch (e) {
        res.status(404).send({ message: 'Error', e })
    }
};

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({ message: 'success' })
    } catch (e) {
        res.status(500).send({ message: 'Error', e })
    }
}



