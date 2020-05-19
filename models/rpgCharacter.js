module.exports = function (sequelize, DataTypes) {
    const RpgCharacter = sequelize.define("RpgCharacter", {
        characterName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        race: {
            type: DataTypes.STRING,
            allowNull: true
        },
        alignment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        experiencePoints: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dexterity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        constitution: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        wisdom: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        charisma: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        currentHitPoints: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        armorClass: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        initiative: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        hitDie: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        languages: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        acrobatics: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        animalHandling: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        arcana: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        athletics: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deception: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        history: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        insight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        intimidation: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        invesigation: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        medicine: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nature: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        perception: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        performance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        persuasion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        religion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sleightOfHand: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stealth: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        survival: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        personalityTraits: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ideals: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bonds: {
            type: DataTypes.STRING,
            allowNull: true
        },
        flaws: {
            type: DataTypes.STRING,
            allowNull: true
        },
        featuresAndTraits: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weapon: {
            type: DataTypes.STRING,
            allowNull: true
        },
        attackBonus: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        damage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        damageType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spellName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spellID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        spellType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spellLevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        castingTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spellRange: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spellComponents: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spellDuration: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    //Each character belongs to a User, 
    //has the user id as a foreign key
    RpgCharacter.associate = function(models) {
        RpgCharacter.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return RpgCharacter;
};
