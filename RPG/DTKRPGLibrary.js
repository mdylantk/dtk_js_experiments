// this file is to hold object types for ref

//TODO: set the stats limits to a type and store it here so less data is stored
//note: weapon and armor is going to be a bit compucated. base mats determin which can be used for types of armor and weapons/tools. cutting do more to light. light is easier to move in and have the least heat generation/ peircing do full dange if armor is periced, but may be harder to get crits(but do more crit dmg). blunt do mor damage to heavy, but it damage is more weigt base and thust slower. also drain stamia of the targer base on weight. impact resistance is used to reduce stamia drain on impact, but mostly useful against blunt, but could negate stamia lost agaist other weapon types. meduim armor best for cold and can be bult to risist wind temp drain/gain, but it not the best in hot evoiment. heavy is heavy and usally bad in most extream temps. it can be buily to be inulated to work in the cold and ealed to resist wind. it high armor and dura makes it useful in long fights, but it weight make it hasrd to evade heavy blunt weapons that usally can eat away at the armor dura. armor reduce damage to person and in most cases it should not hurt person untill the armor is getting warn out or the armor is light/ every quarder of sur, armor should be reduce by 1/8 or down to 50% at 25% to encorage repair, but also allow it to break with armor. also dmage past armor is still subtracted from dura. health may either be reduce to 100 or damage get increaces by 10-100 times  sepending on balancing. games should focus on counter, blocking, and evasion then enduring dmg. blocking more useful in heavy, inreases armor at cost of sheild/weapon dura. blocking in lighter amor will allow countering to be possible, but evading attacks allow it to trigger more. 

var DTKRPGLibrary =   //from canvasgngin for holding the info needed to format Draw() with the name dType
{
	ExpRate: 10, //this time the current level is how much exp is needed to level up.
	
	CheckExp: function (statObject) { //StatObject holds all stats types. exp: stats['main.str'] if it works. TODO: change return type to an object
		//note: only works on stats with exp
		var expRate = this.ExpRate;
		var returnString = "CheckExp Started.";
		var min = 1;
		var decay = 1;
		var hasMax = false;
		var max = 1000; //the max levels to gain per function call. will be reduce to maxuium level if any
		var timeout = 0; //limits a loop to the current amount of maxes or mins/max diffrence
		var endLoop = false; //force a loop to end if a second set of conditions are met
		if (typeof statObject.Name != "undefined" && typeof statObject.Type != "undefined") { //this check work best for types that may contain false values (aka false, 0)
			var name = statObject.Name;
			var type = statObject.Type;
			returnString = returnString + "Checking " + name;
			
			if (typeof statObject.Level != "undefined" && typeof statObject.Exp != "undefined") {
				var level = statObject.Level;
				var exp = statObject.Exp;
				returnString = returnString + ". Level/Exp: " + level + "/" + exp;
				
				if (typeof DTKRPGLibrary.StatType[type].MaxLevel != "undefined") {hasMax = true; max = DTKRPGLibrary.StatType[type].MaxLevel; returnString = returnString + ". Has max level of " + max;}
				if (typeof DTKRPGLibrary.StatType[type].MinLevel != "undefined") { decay = DTKRPGLibrary.StatType[type].MinLevel; min = DTKRPGLibrary.StatType[type].MinLevel; returnString = returnString + ". Has min level of " + min;} //this needs to stay above decay since this set the lowest it goes before decay is applied
				if (typeof DTKRPGLibrary.StatType[type].MinDecayLevel != "undefined") {decay = DTKRPGLibrary.StatType[type].MinDecayLevel; returnString = returnString + ". Has min decay level of " + decay;} //if no decay, then it could decay yo minium level
				
				//code starts here
				if (exp >= (level * expRate)) { //level up
					exp = exp - (level * expRate);
					level = level + 1;
					if (hasMax && level >= max) { level = max; endLoop = true;}
					while (exp >= (level * expRate) && timeout < max && endLoop == false) {
						timeout = timeout + 1;
						exp = exp - (level * expRate);
						level = level + 1;
						if (hasMax && level >= max) { level = max; endLoop = true;}
					}
					statObject.level = level;
					statObject.level = exp;
					returnString = returnString + ". Level up to " + level + " with exp " + exp + " with loops of " + timeout + " new level cap : " + (level * 10);
					timeout = 0;
					endLoop = false;
				}
				else if (exp < 0 && level > decay) { //level decay
					exp = exp + ((level-1) * expRate);
					level = level - 1;
					if (level <= decay) { level = decay; endLoop = true;}
					while (exp < 0 && level > decay && timeout < max && endLoop == false) {
						timeout = timeout + 1;
						exp = exp + ((level-1) * expRate);
						level = level - 1;
						if (level <= min) { level = decay; endLoop = true;}
					}
					statObject.level = level;
					statObject.level = exp;
					returnString = returnString + ". Level decay to " + level + " with exp " + exp + " with loops of " + timeout + " new level cap : " + (level * 10);
					timeout = 0;
					endLoop = false;
				}
				
				
				
				
			}
			else { 
				returnString = returnString + "Invaild Stat Object";
			}
			
		}
		else { 
			returnString = returnString + ". Invaild Stat Object";
		}
		
		
		
		return returnString;
	},
	
	AddExp: function (exp,statObject) { //change the exp or return false id there an error
		var isVaild = false;
		if (typeof statObject.Exp != "undefined") {
			statObject.Exp = statObject.Exp + exp;
			this.CheckExp(statObject);
			isVaild = true;
		}
		return isVaild;
	},
	
	AddLevel: function (level,statObject) { //change the exp or return false id there an error
		var isVaild = false;
		if (typeof statObject.Level != "undefined" && typeof statObject.Type != "undefined") {
			var type = statObject.Type;
			statObject.Level = statObject.Level + level;
			
			
			if (typeof DTKRPGLibrary.StatType[type].MaxLevel != "undefined" && statObject.Level >= DTKRPGLibrary.StatType[type].MaxLevel) { statObject.Level = DTKRPGLibrary.StatType[type].MaxLevel;}
			if (typeof DTKRPGLibrary.StatType[type].MinLevel != "undefined" && statObject.Level <= DTKRPGLibrary.StatType[type].MinLevel) { statObject.Level = DTKRPGLibrary.StatType[type].MinLevel;} //this needs to stay above decay since this set the lowest it goes before decay is applied
			//note level will drop below 0 if there no minium
			isVaild = true;
		}
		return isVaild;
	},
	
	AddStat: function (statData,statlocation) { //todo maybe check type for string insead of undefined. NOTE: will start it off at level one if not stated.
		var isVaild = false;
		var statGroup = "misc";
		var level = 1;
		var exp = 0;
		if (typeof statData.ID != "undefined" && typeof statData.Name != "undefined" && typeof statData.Type != "undefined"  && typeof statlocation != "undefined") {
			
			if (typeof statData.Group != "undefined" ) { statGroup = statData.Group; }
			if (typeof statData.Level != "undefined" ) { level = statData.Level; }
			if (typeof statData.Exp != "undefined" ) { exp = statData.Exp; }
			statlocation[statGroup] = { };
			statlocation[statGroup][statData.ID] = { 
				Name: statData.Name,
				Type: statData.Type,
				Level: level,
				Exp: exp,
			};
			isVaild = true;
		}
		return isVaild
	},
	
	StatType: { //hold infomation on stats types to save memory. most stats will follow similar rules. ones that do not need it own type. TODO: add exp gain ranges and other rates
		
		Primary : {
			MinDecayLevel: 10,
			MaxLevel: 100,
			MinLevel: 1,
			GainRoll: {Min:0,Max:1}, //difficulty will modify this. this is here for fine tuning between skills and primary if needed
			DecayRoll: {Min:-1,Max:0},
		},
		Skills : {
			MinDecayLevel: 25,
			MaxLevel: 100,
			MinLevel: 1,
			GainRoll: {Min:0,Max:1},
			DecayRoll: {Min:-1,Max:0},
		},
		Magic : {
			MinLevel: 1,
			GainRoll: {Min:0,Max:1},
			BaseRegen: 1, //low since it will be multiply to outside influance and maybe max mana

		},
		Health : {
			MaxLevel: 10000,
			MinLevel: 0,
			BaseRegen: 1, //base regenaration for health. may change base on timer. will be pretty slow since  the point is to negate damage to armor
		},
		Stamia : {
			MaxLevel: 10000,
			MinLevel: -1000, //this is the KO number
			BaseCost: 100, //the min cost of an action. it is reduced by endurance(maybe) and increase by weapon and attack types.
			BaseImpact: 10, //min damage on impact
			BaseRegen: 10, //base regenration rate. increased by endurance and buffs
		},
		Hunger : {
			MaxLevel: 6000,
			MinLevel: 0,
			BaseDecay: 1, //todo: add a better nuber. this is the base it will decrease per what ever the timer will be
		},
		Thirst : {
			MaxLevel: 2000,
			MinLevel: 0,
			BaseDecay: 1,
		},
		Tempture : {
			MaxLevel: 1000,
			MinLevel: -1000,
		},
		Rolls : {
			MaxLevel: 100,
			MinLevel: 0,
		},
		
	},
	
	StatsExample: { //decay and min will stay with, but may be omited if it use the standard subtype. else it use the listed one
		
		Primary: { //str and rpg stats
			Str: { //attack power, carry weight, lift base rolls
				Name: "Stat.Primary.Str", //names can be used to id the stats for localized name and discription
				Type: "Primary",
				Level: 1,
				Exp: 0,

			},
			Dex: { //persion base rolls like crafting and crits
				Name: "Stat.Primary.Dex",
				Level: 1,
				Exp: 0,

			},
			End: { //resistance rolls
				Name: "Stat.Primary.End",
				Type: "Primary",
				Level: 1,
				Exp: 0,

			},
			Agi: { //dodge, evade, conter rolls. speed
				Name: "Stat.Primary.Agi",
				Type: "Primary",
				Level: 1,
				Exp: 100,

			},
			Per: { //detection rolls
				Name: "Stat.Primary.Per",
				Type: "Primary",
				Level: 1,
				Exp: 0,

			},
			Chr: { //comunication rolls
				Name: "Stat.Primary.Chr",
				Type: "Primary",
				Level: 1,
				Exp: 0,

			},
			Foc: { //focus rolls. what int and wisdom may include
				Name: "Stat.Primary.Foc",
				Type: "Primary",
				Level: 1,
				Exp: 0,

			},
		},		
		Secondary: { //skills
			Unarmed: { //damage range when not using a weapon
				Name: "Stat.Secondary.Unarmed",
				Type: "Skills",
				Level: 1,
				Exp: 0,
			},
		},
		Main: { //most used
			Mana: { //Mana Pool
				Name: "Stat.Main.Mana",
				Type: "Magic",
				Level: 1,
				Exp: 0,
				//no cap and decay only happen in rare cases. 
			},
			Health: { 
				Name: "Stat.Main.Health",
				Type: "Health",
				Level: 10000,

				// health do not level. the max amonut normamly the same. 10k should be used instead of 100 so floats would not be needed
			},
			Hunger: { 
				Name: "Stat.Main.Hunger",
				Type: "Hunger",
				Level: 6000,

				// similar as health. this should deplete in 3 day
			},
			Thirst: { 
				Name: "Stat.Main.Thirst",
				Type: "Thirst",
				Level: 2000,

				// may get depleted in a day
			},
			Tempture: { 
				Name: "Stat.Main.Tempture",
				Type: "Tempture",
				Level: 1,

				// core temp. magic and stuff can negate or cause change every so often. at certain percent, negatic effects will accure and death at the min or max
			},
			Stamia: { //main energy pool
				Name: "Stat.Main.Stamia",
				Type: "Stamia",
				Level: 10000,

				// like mana and health. you can be knock out if it drop below 0. most actions use this. end reduces the cost and dmg to stamia
			},
			Luck: { 
				Name: "Stat.Main.Luck",
				Type: "Roll",
				Level: 1,

				// only changes on rare cases and my be boosted by magical items. crit, looting, and effects random events in a positive way. may get rolled between 1-10 on start.
			},
		},
	},
	
}; 

