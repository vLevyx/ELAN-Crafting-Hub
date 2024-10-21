document.getElementById('categories').addEventListener('change', populateItems);
document.getElementById('calculateButton').addEventListener('click', calculateResources);

// Define the lists of resources, components, and HQ components
const resourcesList = ['Fabric', 'Polyester', 'Iron Ingot', 'Copper Ingot', 'Glass', 'Component', 'Charcoal', 'Gold Ingot', 'Silver Ingot', 'Petrol', 'Wooden Plank'];
const componentsList = ['Cloth', 'Iron Plate', 'Kevlar', 'Component', 'Tempered Glass', 'Weapon Part', 'Stabilizer', 'Attachment Part', 'Ammo', 'Mechanical Component', 'Engine Part', 'Interior Part', 'Rotor'];
const hqComponentsList = ['Component (HQ)', 'Weapon Part (HQ)', 'Stabilizer (HQ)', 'Attachment Part (HQ)', 'Ammo (HQ)', 'Mechanical Component (HQ)', 'Engine Part (HQ)', 'Interior Part (HQ)', 'Rotor (HQ)', 'Special Rotor', 'Special Gun Barrel'];

const itemsByCategory = {
    'Weapons': ['AK-47', 'Colt 1911', 'Desert Eagle', 'M16A2', 'M16A2 - AUTO', 'M21 SWS', 'M249 SAW', 'M416', 'M9', 'MP5A2', 'MP7A2', 'PKM', 'PM', 'RPK-74', 
                'S8-58V', 'Sa-58P', 'Scar-H', 'SIG MCX', 'SIG MCX SPEAR', 'SSG10A2-Sniper', 'Stegr AUG', 'SR-25 Rifle', 'SVD'],
    'Magazines': ['100rnd PK Belt', '5.45x39mm 30rnd AK Mag', '5.45x39mm 45rnd RPK-74 Tracer Mag', '5.56x45mm 200rnd M249 Belt', '5.56x45mm 30rnd STANAG Mag',
                '7.62x54mmR 100rnd PK Belt', '7.62x39mm 30rnd Sa-58 Mag', '7.62x51mm M80 Mag', '7.62x51mm 20rnd M14 Mag', '7.62x54mmR 10rnd SVD Mag', '8rnd .45 ACP', '9x18mm 8rnd PM Mag',
                '9x19mm 15rnd M9 Mag', '30rnd 9x19 Mag'], 
    'Attachments': ['ART II Scope', 'Carry Handle Red-Dot-Sight', 'PSO-1 Scope', '4x20 Carry Handle Scope'], 
    'Vehicles': ['M1025 Light Armoured Vehicle', 'M151A2 Off-Road', 'M151A2 Off-Road Open Top', 'M923A1 Fuel Truck', 'M923A1 Transport Truck', 'M923A1 Transport Truck - Canopy', 
                'M998 Light Utility Vehicle', 'M998 Light Utility Vehicle - Canopy', 'Mi-8MT Transport Helicopter', 'Pickup-Truck', 'S1203 Minibus', 'UAZ-452 Off-road', 'UAZ-469 Off-road', 'UAZ-469 Off-road - Open Top', 
                'UH-1H Transport Helicopter', 'Ural-4320 Fuel Truck', 'Ural-4320 Transport Truck', 'Ural-4320 Transport Truck - Canopy', 'Ural (Device)', 'VW Rolf'],
    'Vests':    ['6B2 Vest', '6B3 Vest', 'M69 Vest', 'PASGT Vest'], 
    'Helmets': ['PASGT Helmet', 'PASGT Helmet - Camouflaged', 'PASGT Helmet - Camouflaged Netting', 'SPH-4 Helmet', 'SSh-68 Helmet', 
                'SSh-68 Helmet - Camouflaged', 'SSh-68 Helmet - Cover', 'SSh-68 Helmet - Netting', 'ZSh-5 Helmet'], 
    'Clothes': ['ALICE Medium Backpack', 'Bandana', 'BDU Blouse', 'BDU Trousers', 'Beanie', 'Cargo Pants',
                'Cardigan', 'Classic Shoe', 'CWU-27 Pilot Coveralls', 'Dress', 'Fedora', 'Fisher Hat', 'Flat Cap', 'Hunting Vest',
                'Jacket', 'Jeans', 'KLMK Coveralls', 'Knit Cap', 'Kolobok Backpack', 'M70 Backpack', 'M70 Cap', 'M70 Parka',
                'M70 Trousers', 'M88 Field Cap', 'M88 Jacket', 'M88 Trousers', 'Mask (Medical)', 'Officer\'s Cap',
                'Panamka', 'Paper Bag', 'Polo', 'Pullover', 'Runner Shoe', 'Sneaker', 'Soviet Combat Boots',
                'Soviet Pilot Jacket', 'Soviet Pilot Pants', 'Sweater', 'Sweat Pants', 'TShirt', 'US Combat Boots',
                'Veshmeshok Backpack', 'Wool Hat']
};

// Dark mode toggle
const darkModeButton = document.getElementById('darkModeButton');
if (darkModeButton) {  // Ensure the button is present in the DOM
    darkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Toggling dark-mode class for specific elements
        document.querySelector('.container').classList.toggle('dark-mode');
        document.querySelectorAll('.select-box').forEach(select => select.classList.toggle('dark-mode'));
        document.getElementById('result').classList.toggle('dark-mode');

        // Change icon based on mode
        const img = darkModeButton.querySelector('img');
        if (document.body.classList.contains('dark-mode')) {
            img.src = 'https://www.svgrepo.com/show/433086/light-mode.svg'; // Light mode icon
        } else {
            img.src = 'https://www.svgrepo.com/show/433086/light-mode.svg'; // Dark mode icon
        }
    });
}

const itemComponents = {
    'Weapons': {
        'AK-47': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
        },
        'Colt 1911': {
            'Non-HQ': { 'Weapon Part': 5, 'Stabilizer': 3, 'Attachment Part': 3 },
            'HQ': {}
        },
        'Desert Eagle': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 1, 'Stabilizer (HQ)': 1, 'Attachment Part (HQ)': 2 }
        },
        'M16A2': {
            'Non-HQ': { 'Weapon Part': 27, 'Stabilizer': 15, 'Attachment Part': 17 },
            'HQ': {}
        },
        'M16A2 - AUTO': {
            'Non-HQ': { 'Weapon Part': 39, 'Stabilizer': 21, 'Attachment Part': 24 },
            'HQ': {}
        },
        'M21 SWS': {
            'Non-HQ': { 'Weapon Part': 39, 'Stabilizer': 31, 'Attachment Part': 24 },
            'HQ': {}
        },
        'M249 SAW': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 13, 'Stabilizer (HQ)': 13, 'Attachment Part (HQ)': 15, 'Special Gun Barrel': 1 }
        },
        'M416': {
            'Non-HQ': { 'Weapon Part': 43, 'Stabilizer': 23, 'Attachment Part': 26 },
            'HQ': {}
        },
        'M9': {
            'Non-HQ': { 'Weapon Part': 5, 'Stabilizer': 3, 'Attachment Part': 3 },
            'HQ': {}
        },
        'MP5A2': {
            'Non-HQ': { 'Weapon Part': 11, 'Stabilizer': 6, 'Attachment Part': 7 },
            'HQ': {}
        },
        'MP7A2': {
            'Non-HQ': { 'Weapon Part': 15, 'Stabilizer': 8, 'Attachment Part': 9 },
            'HQ': {}
        },
        'PKM': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 19, 'Stabilizer (HQ)': 19, 'Attachment Part (HQ)': 23, 'Special Gun Barrel': 1 }
        },
        'PM': {
            'Non-HQ': { 'Weapon Part': 4, 'Stabilizer': 2, 'Attachment Part': 2 },
            'HQ': {}
        },
        'RPK-74': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 4 }
        },
        'S8-58V': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
        },
        'Sa-58P': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
        },
        'Scar-H': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 4, 'Stabilizer (HQ)': 4, 'Attachment Part (HQ)': 5 }
        },
        'SIG MCX': {
            'Non-HQ': { 'Weapon Part': 55, 'Stabilizer': 30, 'Attachment Part': 34 },
            'HQ': {}
        },
        'SIG MCX SPEAR': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 4 }
        },
        'SSG10A2-Sniper': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 3 }
        },
        'Stegr AUG': {
            'Non-HQ': { 'Weapon Part': 51, 'Stabilizer': 28, 'Attachment Part': 31 },
            'HQ': {}
        },
        'SR-25 Rifle': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 3, 'Stabilizer (HQ)': 3, 'Attachment Part (HQ)': 4 }
        },
        'SVD': {
            'Non-HQ': {},
            'HQ': { 'Weapon Part (HQ)': 6, 'Stabilizer (HQ)': 6, 'Attachment Part (HQ)': 7 }
        }
},
    'Magazines': {
        '30rnd 9x19 Mag': {
            'Non-HQ': { 'Ammo': 1 },
            'HQ': {}
        },
        '7.62x39mm 30rnd Sa-58 Mag': {
            'Non-HQ': { 'Ammo': 1 },
            'HQ': {}
        },
        '7.62x51mm M80 Mag': {
            'Non-HQ': { 'Ammo': 2 },
            'HQ': {}
        },
        '7.62x51mm 20rnd M14 Mag': {
            'Non-HQ': { 'Ammo': 1 },
            'HQ': {}
        },
        '7.62x54mmR 10rnd SVD Mag': {
            'Non-HQ': {},
            'HQ': { 'Ammo (HQ)': 1 }
        },
        '8rnd .45 ACP': {
            'Non-HQ': { 'Ammo': 1 },
            'HQ': {}
        },
        '9x18mm 8rnd PM Mag': {
                'Non-HQ': { 'Ammo': 1 },
                'HQ': {}
        },
        '9x19mm 15rnd M9 Mag': {
            'Non-HQ': { 'Ammo': 1 },
            'HQ': {}
        },
        '100rnd PK Belt': {
            'Non-HQ': { 'Ammo': 1 },
            'HQ': {}
        },
        '5.56x45mm 200rnd M249 Belt': {
            'Non-HQ': {},
            'HQ': { 'Ammo (HQ)': 15 }
        },
        '5.56x45mm 30rnd STANAG Mag': {
            'Non-HQ': { 'Ammo': 1 },
            'HQ': {}
        },
        '5.45x39mm 30rnd AK Mag': {
            'Non-HQ': { 'Ammo': 2 },
            'HQ': {}
        },
        '5.45x39mm 45rnd RPK-74 Tracer Mag': {
            'Non-HQ': {},
            'HQ': { 'Ammo (HQ)': 1 }
        },
        '7.62x54mmR 100rnd PK Belt': {
            'Non-HQ': {},
            'HQ': { 'Ammo (HQ)': 15 }
        },
        '7.62x54mmR 10rnd SVD Mag': {
            'Non-HQ': {},
            'HQ': { 'Ammo (HQ)': 1 }
        }
    },
    'Attachments': {
        '4x20 Carry Handle Scope': {
            'Non-HQ': { 'Component': 41, 'Tempered Glass': 18 },
            'HQ': {}
        },
        'ART II Scope': {
            'Non-HQ': { 'Component': 2, 'Tempered Glass': 1 },
            'HQ': {}
        },
        'Carry Handle Red-Dot-Sight': {
            'Non-HQ': { 'Component': 5, 'Tempered Glass': 2 },
            'HQ': {}
        },
        'PSO-1 Scope': {
            'Non-HQ': { 'Component': 4, 'Tempered Glass': 1 },
            'HQ': {}
        }
    },
    'Vehicles': {
        'Ural-4320 Transport Truck - Canopy': {
            'Non-HQ': {},
            'HQ': {'Mechanical Component (HQ)': 5, 'Interior Part (HQ)': 5, 'Engine Part (HQ)': 3 }
        },
        'UH-1H Transport Helicopter': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 19, 'Interior Part (HQ)': 17, 'Engine Part (HQ)': 12, 'Rotor (HQ)': 30, 'Special Rotor': 1 }
        },
        'UAZ-469 Off-road': {
            'Non-HQ': { 'Mechanical Component': 1, 'Interior Part': 1, 'Engine Part': 1 },
            'HQ': {}
        },
        'UAZ-469 Off-road - Open Top': {
            'Non-HQ': { 'Mechanical Component': 1, 'Interior Part': 1, 'Engine Part': 1 },
            'HQ': {}
        },
        'M151A2 Off-Road': {
            'Non-HQ': { 'Mechanical Component': 1, 'Engine Part': 1 },
            'HQ': {}
        },
        'M151A2 Off-Road Open Top': {
            'Non-HQ': { 'Mechanical Component': 1, 'Engine Part': 1 },
            'HQ': {}
        },
        'UAZ-452 Off-road': {
            'Non-HQ': { 'Mechanical Component': 3, 'Interior Part': 2, 'Engine Part': 3 },
            'HQ': {}
        },
        'M998 Light Utility Vehicle': {
            'Non-HQ': { 'Mechanical Component': 5, 'Interior Part': 3, 'Engine Part': 5 },
            'HQ': {}
        },
        'M998 Light Utility Vehicle - Canopy': {
            'Non-HQ': { 'Mechanical Component': 6, 'Interior Part': 4, 'Engine Part': 4 },
            'HQ': {}
        },
        'Mi-8MT Transport Helicopter': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 30, 'Interior Part (HQ)': 27, 'Engine Part (HQ)': 19, 'Rotor (HQ)': 48, 'Special Rotor': 1 }
        },
        'M1025 Light Armoured Vehicle': {
            'Non-HQ': { 'Mechanical Component': 9, 'Interior Part': 5, 'Engine Part': 9 },
            'HQ': {}
        },
        'M923A1 Transport Truck': {
            'Non-HQ': { 'Mechanical Component': 31, 'Interior Part': 19, 'Engine Part': 31 },
            'HQ': {}
        },
        'M923A1 Fuel Truck': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 1, 'Interior Part (HQ)': 1, 'Engine Part (HQ)': 1 }
        },
        'M923A1 Transport Truck - Canopy': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 2, 'Interior Part (HQ)': 2, 'Engine Part (HQ)': 1 }
        },
        'Ural-4320 Fuel Truck': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 4, 'Interior Part (HQ)': 3, 'Engine Part (HQ)': 2 }
        },
        'Ural-4320 Transport Truck': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 4, 'Interior Part (HQ)': 3, 'Engine Part (HQ)': 2 }
        },
        'Ural-4320 Transport Truck - Canopy': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 4, 'Interior Part (HQ)': 3, 'Engine Part (HQ)': 2 }
        },
        'Ural (Device)': {
            'Non-HQ': {},
            'HQ': { 'Mechanical Component (HQ)': 29, 'Interior Part (HQ)': 27, 'Engine Part (HQ)': 18 }
        },
        'Pickup-Truck': {
            'Non-HQ': { 'Mechanical Component': 19, 'Interior Part': 11, 'Engine Part': 19 },
            'HQ': {}
        },
        'VW Rolf': {
            'Non-HQ': { 'Mechanical Component': 31, 'Interior Part': 19, 'Engine Part': 31 },
            'HQ': {}
        },
        'S1203 Minibus': {
            'Non-HQ': { 'Mechanical Component': 7, 'Interior Part': 4, 'Engine Part': 7 },
            'HQ': {}
        }
    },
    'Vests': {
        '6B2 Vest': {
            'Non-HQ': { 'Iron Plate': 10, 'Cloth': 14 },
            'HQ': {}
        },
        '6B3 Vest': {
            'Non-HQ': { 'Kevlar': 7 },
            'HQ': {}
        },
        'M69 Vest': {
            'Non-HQ': { 'Iron Plate': 10, 'Cloth': 14 },
            'HQ': {}
        },
        'PASGT Vest': {
            'Non-HQ': {},
            'HQ': {}
        }
    },
    'Helmets': {
        'PASGT Helmet': {
            'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
            'HQ': {}
        },
        'PASGT Helmet - Camouflaged': {
            'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
            'HQ': {}
        },
        'PASGT Helmet - Camouflaged Netting': {
            'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
            'HQ': {}
        },
        'SPH-4 Helmet': {
            'Non-HQ': { 'Iron Plate': 7, 'Cloth': 10 },
            'HQ': {}
        },
        'SSh-68 Helmet': {
            'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
            'HQ': {}
        },
        'SSh-68 Helmet - Camouflaged': {
            'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
            'HQ': {}
        },
        'SSh-68 Helmet - Cover': {
            'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
            'HQ': {}
        },
        'SSh-68 Helmet - Netting': {
            'Non-HQ': { 'Iron Plate': 2, 'Cloth': 2 },
            'HQ': {}
        },
        'ZSh-5 Helmet': {
            'Non-HQ': { 'Iron Plate': 7, 'Cloth': 10 },
            'HQ': {}
        }
    },
    'Clothes': {
            'ALICE Medium Backpack': {
                'Non-HQ': { 'Cloth': 2 },
                'HQ': {}
            },
            'Bandana': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'BDU Blouse': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'BDU Trousers': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Beanie': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Cargo Pants': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Cardigan': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Classic Shoe': {
                'Non-HQ': { 'Cloth': 2 },
                'HQ': {}
            },
            'CWU-27 Pilot Coveralls': {
                'Non-HQ': { 'Cloth': 20 },
                'HQ': {}
            },
            'Dress': {
                'Non-HQ': { 'Cloth': 3 },
                'HQ': {}
            },
            'Fedora': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Fisher Hat': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Flat Cap': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Hunting Vest': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Jacket': {
                'Non-HQ': { 'Cloth': 2 },
                'HQ': {}
            },
            'Jeans': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'KLMK Coveralls': {
                'Non-HQ': { 'Cloth': 0 },
                'HQ': {}
            },
            'Knit Cap': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Kolobok Backpack': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'M70 Backpack': {
                'Non-HQ': { 'Cloth': 2 },
                'HQ': {}
            },
            'M70 Cap': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'M70 Parka': {
                'Non-HQ': { 'Cloth': 2 },
                'HQ': {}
            },
            'M70 Trousers': {
                'Non-HQ': { 'Cloth': 2 },
                'HQ': {}
            },
            'M88 Field Cap': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'M88 Jacket': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'M88 Trousers': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Mask (Medical)': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Officer\'s Cap': {
                'Non-HQ': { 'Cloth': 64 },
                'HQ': {}
            },
            'Panamka': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Paper Bag': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Polo': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Pullover': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Runner Shoe': {
                'Non-HQ': { 'Cloth': 2 },
                'HQ': {}
            },
            'Sneaker': {
                'Non-HQ': { 'Cloth': 4 },
                'HQ': {}
            },
            'Soviet Combat Boots': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Soviet Pilot Jacket': {
                'Non-HQ': { 'Cloth': 11 },
                'HQ': {}
            },
            'Soviet Pilot Pants': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Sweater': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Sweat Pants': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'TShirt': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'US Combat Boots': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Veshmeshok Backpack': {
                'Non-HQ': { 'Cloth': 1 },
                'HQ': {}
            },
            'Wool Hat': {
                'Non-HQ': { 'Cloth': 50 },
                'HQ': {}
            }
        }
    };

const componentResources = {
    'Cloth': { 'Fabric': 1, 'Polyester': 1 },
    'Iron Plate': { 'Iron Ingot': 1, 'Fabric': 1, 'Polyester': 1 },
    'Kevlar': { 'Iron Plate': 1, 'Iron Ingot': 3 },
    'Component': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
    'Tempered Glass': { 'Glass': 2, 'Polyester': 1 },
    'Weapon Part': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
    'Stabilizer': { 'Iron Ingot': 2, 'Gold Ingot': 1 },
    'Attachment Part': { 'Copper Ingot': 2, 'Silver Ingot': 1 },
    'Ammo': { 'Iron Ingot': 1, 'Charcoal': 1 },
    'Mechanical Component': { 'Iron Ingot': 2, 'Copper Ingot': 2 },
    'Engine Part': { 'Iron Ingot': 1, 'Copper Ingot': 1, 'Petrol': 1 },
    'Interior Part': { 'Fabric': 2, 'Polyester': 2 },
    'Rotor': { 'Charcoal': 1, 'Polyester': 1 },
    'Component (HQ)': { 'Component': 2, 'Gold Ingot': 15 },
    'Weapon Part (HQ)': { 'Weapon Part': 3, 'Iron Ingot': 15, 'Copper Ingot': 15 },
    'Stabilizer (HQ)': { 'Stabilizer': 3, 'Polyester': 15 },
    'Attachment Part (HQ)': { 'Attachment Part': 3, 'Wooden Plank': 15 },
    'Ammo (HQ)': { 'Ammo': 3, 'Petrol': 1 },
    'Mechanical Component (HQ)': { 'Mechanical Component': 9, 'Gold Ingot': 45 },
    'Engine Part (HQ)': { 'Engine Part': 9, 'Copper Ingot': 45, 'Petrol': 45 },
    'Interior Part (HQ)': { 'Interior Part': 9, 'Wooden Plank': 45 },
    'Rotor (HQ)': { 'Rotor': 9, 'Silver Ingot': 30 },
    'Special Rotor': { 'Special Rotor': 1 },
    'Special Gun Barrel': { 'Special Gun Barrel': 1 },
};

function populateItems() {
    const category = document.getElementById('categories').value;
    const items = itemsByCategory[category];
    const itemsDropdown = document.getElementById('items');
    
    itemsDropdown.innerHTML = '';

    items.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        option.value = item;
        itemsDropdown.appendChild(option);
    });
}

function calculateResources() {
    const category = document.getElementById('categories').value;
    const item = document.getElementById('items').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    let totalResources = {}; // Object to store total resources needed
    let totalComponents = {}; // Object to store total non-HQ components needed
    let totalHQComponents = {}; // Object to store total HQ components needed

    const selectedCategory = itemComponents[category];
    const itemData = selectedCategory[item];

    // Step 1: Calculate HQ components and their associated non-HQ components
    if (itemData['HQ']) {
        for (const hqComponent in itemData['HQ']) {
            const hqQuantity = itemData['HQ'][hqComponent] * quantity;

            // Add HQ component totals
            totalHQComponents[hqComponent] = (totalHQComponents[hqComponent] || 0) + hqQuantity;

            // Step 2: Break down HQ components into non-HQ components (skip "Special Rotor")
            if (hqComponent !== 'Special Rotor' && componentResources[hqComponent]) {
                for (const nonHQComponent in componentResources[hqComponent]) {
                    const nonHQQuantity = componentResources[hqComponent][nonHQComponent] * hqQuantity;

                    // Add to total non-HQ components
                    totalComponents[nonHQComponent] = (totalComponents[nonHQComponent] || 0) + nonHQQuantity;

                    // Step 3: Calculate resources for these non-HQ components
                    if (resourcesList.includes(nonHQComponent)) {
                        totalResources[nonHQComponent] = (totalResources[nonHQComponent] || 0) + nonHQQuantity;
                    } else if (componentResources[nonHQComponent]) {
                        for (const resource in componentResources[nonHQComponent]) {
                            const resourceQuantity = componentResources[nonHQComponent][resource] * nonHQQuantity;
                            totalResources[resource] = (totalResources[resource] || 0) + resourceQuantity;
                        }
                    }
                }
            }
        }
    }

    // Step 4: Calculate non-HQ components and their resources directly
    if (itemData['Non-HQ']) {
        for (const nonHQComponent in itemData['Non-HQ']) {
            const nonHQQuantity = itemData['Non-HQ'][nonHQComponent] * quantity;

            // Add non-HQ component totals
            totalComponents[nonHQComponent] = (totalComponents[nonHQComponent] || 0) + nonHQQuantity;

            // Calculate resources for these non-HQ components
            if (resourcesList.includes(nonHQComponent)) {
                totalResources[nonHQComponent] = (totalResources[nonHQComponent] || 0) + nonHQQuantity;
            } else if (componentResources[nonHQComponent]) {
                for (const resource in componentResources[nonHQComponent]) {
                    const resourceQuantity = componentResources[nonHQComponent][resource] * nonHQQuantity;
                    totalResources[resource] = (totalResources[resource] || 0) + resourceQuantity;
                }
            }
        }
    }

    // Step 5: Display the results
    displayResults(totalResources, totalComponents, totalHQComponents);
}

function displayResults(totalResources, totalComponents, totalHQComponents) {
    let resultHTML = '';

    // Display resources needed
    resultHTML += '<h2>Resources needed:</h2><ul>';
    for (const resource in totalResources) {
        resultHTML += `<li>${resource}: ${totalResources[resource]}</li>`;
    }
    resultHTML += '</ul>';

    // Display non-HQ components needed (only non-HQ components, no resources like Copper, Iron, etc.)
    resultHTML += '<h2>Components needed:</h2><ul>';
    for (const component in totalComponents) {
        if (!resourcesList.includes(component) && component !== 'Special Rotor') {  // Ensure components like Mechanical Component, Interior Part, etc. Skip "Special Rotor"
            resultHTML += `<li>${component}: ${totalComponents[component]}</li>`;
        }
    }
    resultHTML += '</ul>';

    // Display HQ components needed (including "Special Rotor")
    resultHTML += '<h2>HQ Components needed:</h2><ul>';
    for (const hqComponent in totalHQComponents) {
        resultHTML += `<li>${hqComponent}: ${totalHQComponents[hqComponent]}</li>`;
    }
    resultHTML += '</ul>';

    document.getElementById('result').innerHTML = resultHTML;
}
