DROP DATABASE IF EXISTS rpgDB;
CREATE database rpgDB;

USE rpgDB;

CREATE TABLE rpg_character
(
    position INT NOT NULL,
    character_name VARCHAR(100) NULL,
    character_class VARCHAR(100) NULL,
    character_level INT NULL,
    character_race VARCHAR(35) NULL,
    character_alignment VARCHAR(35) NULL,
    experience_points INT NULL,
    
    base_strength INT NULL,
    base_dex INT NULL,
    base_con INT NULL,
    base_int INT NULL,
    base_wisdom INT NULL,
    base_charisma INT NULL,
    
    current_hitpoints INT NULL,
    armor_class INT NULL,
    initiative INT NULL,
    base_speed INT NULL,
    hit_die INT NULL,
    
    languages VARCHAR(100) NULL,
	acrobatics INT NULL,
    animal_handling INT NULL,
    arcana INT NULL,
    athletics INT NULL,
    deception INT NULL,
    history INT NULL,
    insight INT NULL,
    intimidation INT NULL,
    invesitgation INT NULL,
    medicine INT NULL,
    nature INT NULL,
    perception INT NULL,
    performance INT NULL,
    persuasion INT NULL,
    religion INT NULL,
    sleight_of_hand INT NULL,
    stealth INT NULL,
    survival INT NULL,
    
    personality_traits VARCHAR(500) NULL,
    ideals VARCHAR(500) NULL,
    bonds VARCHAR(500) NULL,
    flaws VARCHAR(500) NULL,
    
	weapon VARCHAR(50) NULL,
    attack_bonus INT NULL,
    damage INT NULL,
    damage_type VARCHAR(50),
    
    spell_id INT(11) NOT NULL,
	spell_name VARCHAR(128) NOT NULL,
    spell_level INT(2) NOT NULL,
	spell_type VARCHAR(128) NOT NULL,
	casting_time VARCHAR(128) NOT NULL,
	spell_range VARCHAR(128) NOT NULL,
	spell_components VARCHAR(128) NOT NULL,
	spell_duration VARCHAR(128) NOT NULL,
    PRIMARY KEY (position)
);

    SELECT * FROM rpg_character;
    