document.getElementById('categories').addEventListener('change', populateItems);
document.getElementById('calculateButton').addEventListener('click', calculateResources);

// Define the lists of resources, components, and HQ components
const resourcesList = ['Fabric', 'Polyester', 'Iron Ingot', 'Kevlar', 'Copper Ingot', 'Glass', 'Component', 'Charcoal', 'Gold Ingot', 'Silver Ingot', 'Petrol'];
const componentsList = ['Cloth', 'Iron Plate', 'Kevlar', 'Component', 'Tempered Glass', 'Weapon Part', 'Stabilizer', 'Attachment Part', 'Ammo', 'Mechanical Component', 'Engine Part', 'Interior Part', 'Rotor'];
const hqComponentsList = ['Component (HQ)', 'Weapon Part (HQ)', 'Stabilizer (HQ)', 'Attachment Part (HQ)', 'Ammo (HQ)', 'Mechanical Component (HQ)', 'Engine Part (HQ)', 'Interior Part (HQ)', 'Rotor (HQ)', 'Special Rotor'];

const itemsByCategory = {
    'Weapons': ['M16A2', 'MP5A2', 'M9', 'Colt 1911'],
    'Magazines': ['30rnd 9x19 Mag', '5.45x39mm 45rnd RPK-74 Tracer Mag', '7.62x39mm 30rnd Sa-58 Mag', 
                   '7.62x51mm 20rnd M14 Mag', '8rnd .45 ACP', '9x19mm 15rnd M9 Mag', '100rnd PK Belt', 
                   '5.56x45mm 30rnd STANAG Mag'], 
    'Attachments': ['4x20 Carry Handle Scope'], 
    'Vehicles': ['UH-1H Transport Helicopter', 'Ural-4320 Transport Truck - Canopy', 
                'UAZ-469 Off-road', 'UAZ-469 Off-road - Open Top', 'M151A2 Off-road', 'UAZ-452 Off-road', 
                'M998 Light Utility Vehicle', 'M1025 Light Armoured Vehicle', 'M923A1 Transport Truck', 
                'M923A1 Fuel Truck', 'M923A1 Transport Truck - Canopy', 'Ural-4320 Fuel Truck', 
                'Ural-4320 Transport Truck', 'Ural-4320 Transport Truck - Canopy', 'Pickup-Truck', 'VW Rolf'], 
    'Vests': [], 
    'Helmets': [], 
    'Clothes': ['M88 Jacket', 'M88 Trousers', 'Soviet Combat Boots', 'US Combat Boots', 'BDU Blouse', 
                'BDU Trousers', 'Cardigan', 'Cargo Pants', 'Hunting Vest', 'Jeans', 'M70 Parka', 
                'M70 Trousers', 'Sweater', 'Jacket', 'Polo', 'Pullover', 'Runner Shoe', 'Sneaker', 
                'Sweat Pants', 'TShirt', 'Dress', 'CWU-27 Pilot Coveralls', 'Soviet Pilot Jacket', 
                'Soviet Pilot Pants', 'Kolobok Backpack', 'Veshmeshok Backpack', 'ALICE Medium Backpack', 
                'M70 Backpack', 'Knit Cap', 'M88 Field Cap', 'Panamka', 'Bandana', 'Fedora', 'Fisher Hat', 
                'Flat Cap', 'M70 Cap', 'Beanie', 'Boonie', 'Mask (Medical)', 'Paper Bag', 'Wool Hat', 
                'Officer\'s Cap']
};

const magazines = [
    '30rnd 9x19 Mag', '5.45x39mm 45rnd RPK-74 Tracer Mag', '7.62x39mm 30rnd Sa-58 Mag', 
    '7.62x51mm 20rnd M14 Mag', '8rnd .45 ACP', '9x19mm 15rnd M9 Mag', '100rnd PK Belt', 
    '5.56x45mm 30rnd STANAG Mag'
];

const clothes = [
    'M88 Jacket', 'M88 Trousers', 'Soviet Combat Boots', 'US Combat Boots', 'BDU Blouse', 
    'BDU Trousers', 'Cardigan', 'Cargo Pants', 'Hunting Vest', 'Jeans', 'M70 Parka', 
    'M70 Trousers', 'Sweater', 'Jacket', 'Polo', 'Pullover', 'Runner Shoe', 'Sneaker', 
    'Sweat Pants', 'TShirt', 'Dress', 'CWU-27 Pilot Coveralls', 'Soviet Pilot Jacket', 
    'Soviet Pilot Pants', 'Kolobok Backpack', 'Veshmeshok Backpack', 'ALICE Medium Backpack', 
    'M70 Backpack', 'Knit Cap', 'M88 Field Cap', 'Panamka', 'Bandana', 'Fedora', 'Fisher Hat', 
    'Flat Cap', 'M70 Cap', 'Beanie', 'Boonie', 'Mask (Medical)', 'Paper Bag', 'Wool Hat', 
    'Officer\'s Cap'
];

const itemComponents = {
    'M16A2': {
        'Non-HQ': { 'Weapon Part': 27, 'Stabilizer': 15, 'Attachment Part': 17 },
        'HQ': {}
    },
    'MP5A2': {
        'Non-HQ': { 'Weapon Part': 11, 'Stabilizer': 6, 'Attachment Part': 7 },
        'HQ': {}
    },
    'M9': {
        'Non-HQ': { 'Weapon Part': 5, 'Stabilizer': 3, 'Attachment Part': 3 },
        'HQ': {}
    },
    'Colt 1911': {
        'Non-HQ': { 'Weapon Part': 5, 'Stabilizer': 3, 'Attachment Part': 3 },
        'HQ': {}
    },
    'Ural-4320 Transport Truck - Canopy': {
        'Non-HQ': {},
        'HQ': {'Mechanical Component (HQ)': 5, 'Interior Part (HQ)': 5, 'Engine Part (HQ)': 3
        }
    },
    'UH-1H Transport Helicopter': {
        'Non-HQ': {},
        'HQ': { 'Mechanical Component (HQ)': 19, 'Interior Part (HQ)': 17, 'Engine Part (HQ)': 12, 'Rotor (HQ)': 30, 'Special Rotor': 1
        }
    },
    'UAZ-469 Off-road': {
        'Non-HQ': { 'Mechanical Component': 1, 'Interior Part': 1, 'Engine Part': 1 },
        'HQ': {}
    },
    'UAZ-469 Off-road - Open Top': {
        'Non-HQ': { 'Mechanical Component': 1, 'Interior Part': 1, 'Engine Part': 1 },
        'HQ': {}
    },
    'M151A2 Off-road': {
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
    'Pickup-Truck': {
        'Non-HQ': { 'Mechanical Component': 19, 'Interior Part': 11, 'Engine Part': 19 },
        'HQ': {}
    },
    'VW Rolf': {
        'Non-HQ': { 'Mechanical Component': 31, 'Interior Part': 19, 'Engine Part': 31 },
        'HQ': {}
    }
};

clothes.forEach(item => {
    itemComponents[item] = {'Non-HQ': {'Cloth': 1}, 'HQ': {}};
});

magazines.forEach(item => {
    itemComponents[item] = {'Non-HQ': {'Ammo': 1}, 'HQ': {}};
});

const componentResources = {
    'Cloth': { Fabric: 1, Polyester: 1 },
    'Iron Plate': { 'Iron Ingot': 1, Fabric: 1, Polyester: 1 },
    'Kevlar': { 'Iron Plate': 1, 'Iron Ingot': 3 },
    'Component': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
    'Tempered Glass': { Glass: 2, Polyester: 1 },
    'Weapon Part': { 'Iron Ingot': 1, 'Copper Ingot': 1 },
    'Stabilizer': { 'Iron Ingot': 2, 'Gold Ingot': 1 },
    'Attachment Part': { 'Copper Ingot': 2, 'Silver Ingot': 1 },
    'Ammo': { 'Iron Ingot': 1, Charcoal: 1 },
    'Mechanical Component': { 'Iron Ingot': 2, 'Copper Ingot': 2 },
    'Engine Part': { 'Iron Ingot': 1, 'Copper Ingot': 1, Petrol: 1 },
    'Interior Part': { Fabric: 2, Polyester: 2 },
    'Rotor': { Charcoal: 1, Polyester: 1 },
    'Component (HQ)': { Component: 2, 'Gold Ingot': 15 },
    'Weapon Part (HQ)': { 'Weapon Part': 3, 'Iron Ingot': 15, 'Copper Ingot': 15 },
    'Stabilizer (HQ)': { Stabilizer: 3, Polyester: 15 },
    'Attachment Part (HQ)': { 'Attachment Part': 3, 'Wooden Plank': 15 },
    'Ammo (HQ)': { Ammo: 3, Petrol: 1 },
    'Mechanical Component (HQ)': { 'Mechanical Component': 9, 'Gold Ingot': 45 },
    'Engine Part (HQ)': { 'Engine Part': 9, 'Copper Ingot': 45, Petrol: 45 },
    'Interior Part (HQ)': { 'Interior Part': 9, 'Wooden Plank': 45 },
    'Rotor (HQ)': { Rotor: 9, 'Silver Ingot': 30 },
    'Special Rotor': { 'Special Rotor': 1 },
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
    const item = document.getElementById('items').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    let totalResources = {};
    let totalComponents = {};
    let totalHQComponents = {};

    // Calculate resources needed for non-HQ components
    for (const component in itemComponents[item]['Non-HQ']) {
        const totalComponentQuantity = itemComponents[item]['Non-HQ'][component] * quantity;

        for (const resource in componentResources[component]) {
            const resourcePerUnit = componentResources[component][resource];
            const totalResourceQuantity = resourcePerUnit * totalComponentQuantity;

            if (resourcesList.includes(resource)) {
                if (!totalResources[resource]) {
                    totalResources[resource] = totalResourceQuantity;
                } else {
                    totalResources[resource] += totalResourceQuantity;
                }
            }
        }

        if (componentsList.includes(component)) {
            totalComponents[component] = totalComponentQuantity;
        }
    }

    // Calculate resources needed for HQ components and corresponding non-HQ components
    for (const hqComponent in itemComponents[item]['HQ']) {
        const totalHQComponentQuantity = itemComponents[item]['HQ'][hqComponent] * quantity;

        for (const subComponent in componentResources[hqComponent]) {
            const subComponentPerUnit = componentResources[hqComponent][subComponent];
            const totalSubComponentQuantity = subComponentPerUnit * totalHQComponentQuantity;

            if (resourcesList.includes(subComponent)) {
                if (!totalResources[subComponent]) {
                    totalResources[subComponent] = totalSubComponentQuantity;
                } else {
                    totalResources[subComponent] += totalSubComponentQuantity;
                }
            }

            if (componentsList.includes(subComponent)) {
                if (!totalComponents[subComponent]) {
                    totalComponents[subComponent] = totalSubComponentQuantity;
                } else {
                    totalComponents[subComponent] += totalSubComponentQuantity;
                }
            }
        }

        if (hqComponentsList.includes(hqComponent)) {
            totalHQComponents[hqComponent] = totalHQComponentQuantity;
        }
    }

    let resultHTML = '<h2>Resources needed:</h2>';
    resultHTML += '<ul>';

    // Display total resources needed
    for (const resource in totalResources) {
        resultHTML += `<li>${resource}: ${totalResources[resource]}</li>`;
    }

    resultHTML += '</ul>';

    // Display components needed
    resultHTML += '<h2>Components needed:</h2>';
    resultHTML += '<ul>';

    for (const component in totalComponents) {
        resultHTML += `<li>${component}: ${totalComponents[component]}</li>`;
    }

    resultHTML += '</ul>';

    // Display HQ components needed
    resultHTML += '<h2>HQ Components needed:</h2>';
    resultHTML += '<ul>';

    for (const hqComponent in totalHQComponents) {
        resultHTML += `<li>${hqComponent}: ${totalHQComponents[hqComponent]}</li>`;
    }

    resultHTML += '</ul>';

    document.getElementById('result').innerHTML = resultHTML;
}
