    static async addContact(req, res) {
        // console.log(req.url);
        // console.log(req.method);
        console.log(req.body);
        // console.log(req.params);
        // console.log(req.query);
        // res.redirect("/")
        // add new record - method 1
        const contact1 = await Contact.create({
            userId: req.params.userId,
            firstName: "ali",
        });
        contact1.firstName = "overwrite";
        await contact1.save();

        // add new record - method 2
        const contact2 = Contact.build({
            userId: req.params.userId,
            firstName: "ali",
        });
        contact2.firstName("overwrite2");
        await contact2.save();
        console.log(contact2);
        console.log(contact2.firstName);
        // 2 below commands are same as eachother
        console.log(contact2.dataValues);
        console.log(contact2.toJSON());
        // baes mishe bere va contact2 ro az database etelaatesho bekhoone biare
        await contact2.reload();
        console.log(contact2.toJSON());

        // get fields but only add specific ones given in fields
        const contact3 = await Contact.create(
            {
                userId: req.params.userId,
                firstName: "ali",
                lastName: "bayat",
            },
            {
                fields: ["userId", "firstName"],
            }
        );

        // create only if it's new
        const [contact4, isCreated] = await Contact.findOrCreate({
            where: {
                userId: 2,
            },
            defaults: {
                firstName: "mojtaba",
                lastName: "poorpooraki",
            },
        });

        // reading data from db
        // get all contacts
        let contacts = await Contact.findAll();
        contacts = contacts.map((contact) => contact.dataValues); // as same as contacts = contacts.map((contact) => contact.toJSON());

        // get all with condition
        contacts = await Contact.findAll({
            where: {
                id: {
                    [Op.gt]: 2,
                },
            },
            limit: 3,
            offset: 2,
        });

        // get only one, return null if not exists
        let contact = await Contact.findOne({
            where: {
                id: {
                    [Op.gt]: 2,
                },
            },
        });

        // get by primary key
        contact = await Contact.findByPk(2);

        // like findall but also return all record count
        contacts = await Contact.findAndCountAll({
            where: {
                id: {
                    [Op.gt]: 2,
                },
            },
            limit: 2,
            raw: true,
        });
        console.log(contacts.rows);
        console.log(contacts.count);

        // get only count
        const count = await Contact.count({
            where: {
                id: {
                    [Op.gt]: 2,
                },
            },
        });
        console.log(count);

        // get minimum of a field
        const min = await Contact.min("joinDate", {
            where: {
                id: {
                    [Op.gt]: 2,
                },
            },
        });
        console.log(min);
        // get max  await Contact.max("joinDate");
        // get sum await Contact.sum("joinDate");

        // get only specific fields
        contacts = await Contact.findAll({
            limit: 3,
            attributes: ["firstName", "lastName"],
        });

        // get with excluded fields
        contacts = await Contact.findAll({
            limit: 3,
            attributes: {
                exclude: ["firstName", "lastName"],
            },
        });

        // get with compare two fields (فقط اونایی که اسمشون از نظر الفبایی از فامیلی بزرگتره)
        contacts = await Contact.findAll({
            where: {
                firstName: {
                    [Op.gt]: sql.attribute("lastName"),
                },
            },
            attributes: ["firstName", "lastName"],
            logging: console.log,
        });

        // ordering, if firstName as same as eachother order by lastName
        contacts = await Contact.findAll({
            attributes: ["firstName", "lastName"],
            order: [["firstName", "DESC"], "lastName"],
            logging: console.log,
        });

        // START these filters are as same as each other
        contacts = await Contact.findAll({
            where: {
                firstName: {
                    [Op.eq]: "ali",
                },
                // firstName: {
                //     [Op.is]: null,
                // },
                // firstName: {
                //     [Op.in]: ["ali", "saman"],
                // },
            },
            attributes: ["firstName", "lastName"],
        });
        contacts = await Contact.findAll({
            where: {
                firstName: "ali",
                // firstName: null,
                // firstName: ["ali", "saman"],
            },
            attributes: ["firstName", "lastName"],
        });
        // END these filters are as same as each other

        // other Op properties
        contacts = await Contact.findAll({
            where: {
                firstName: {
                    // not equal
                    [Op.ne]: "ali",
                },
                // firstName: {
                //     [Op.notIn]: ["ali", "reza", "saman"],
                // },
                // firstName: {
                //     [Op.isNot]: null,
                // },
                // firstName: {
                //     [Op.like]: "%amir%",
                // },
                // firstName: {
                //     [Op.regexp]: "\\d{2}",
                // },
                // more info in https://sequelize.org/docs/v7/querying/operators/
            },
            attributes: ["firstName", "lastName"],
        });

        // AND , OR , NOT in filtering
        contacts = await Contact.findAll({
            where: {
                [Op.not]: {
                    [Op.or]: {
                        firstName: "ali",
                        lastName: "sepehri",
                    },
                },
                id: {
                    [Op.gt]: 2,
                },
            },
            attributes: ["id", "firstName", "lastName"],
        });

        // Update data with sequalize - method 1
        contact = await Contact.findByPk(10);
        contact.firstName = "gholam";
        await contact.save();

        // Update data with sequalize - method 2
        contact = await Contact.findByPk(10);
        contact.set({
            firstName: "gholam",
            lastName: "rezayi",
        });
        await contact.save({ fileds: ["firstName"] });

        // Update data with sequalize - method 3
        contact = await Contact.findByPk(3);
        await contact.update({
            firstName: "gholam",
        });

        // Update data with sequalize - method 4
        await Contact.update(
            {
                firstName: "gholam",
            },
            {
                where: {
                    id: {
                        [Op.gt]: 2,
                    },
                },
                limit: 3,
            }
        );

        // Delete data with sequalize - method 1
        contact = await Contact.findByPk(10);
        let result = await contact.destroy({ logging: console.log });

        // Delete data with sequalize - method 2
        result = await Contact.destroy({
            where: {
                id: {
                    [Op.lt]: 3,
                },
            },
            logging: console.log,
        });

        // Delete whole of Table
        await Contact.destroy({
            truncate: true,
            logging: console.log,
        });

        try {
            let data;
            // some database work goes here
            res.status(201).json({
                success: true,
                body: data,
                message: "A new contact added",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                body: null,
                message: "An internal error happend",
            });
        }
    }