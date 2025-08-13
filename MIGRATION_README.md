# Database Migration and Data Insertion Guide

This guide explains how to use the migration scripts and insert data into your database.

## Prerequisites

1. Make sure MySQL is running and accessible
2. Ensure your database `node_project` exists
3. Verify your database credentials in `config/database.js`

## Installation

First, install the required dependencies:

```bash
npm install
npm install sequelize-cli --save-dev
```

## Method 1: Using Sequelize CLI (Recommended)

### 1. Run Migrations
This will create the necessary tables:

```bash
npm run migrate
```

### 2. Insert Seed Data
This will insert sample data:

```bash
npm run seed
```

### 3. Undo Operations (if needed)
To undo the last migration:
```bash
npm run migrate:undo
```

To undo all seed data:
```bash
npm run seed:undo
```

## Method 2: Using Custom Scripts

### 1. Insert Designation Data Only
```bash
node scripts/insert-data.js
```

### 2. Insert Generic Data (Multiple Tables)
```bash
node scripts/insert-generic-data.js
```

## Method 3: Manual Data Insertion

You can also insert data manually using your existing models:

```javascript
const Designation = require('./models/designation');

// Insert single record
const newDesignation = await Designation.create({
  designation: 'New Role'
});

// Insert multiple records
const designations = await Designation.bulkCreate([
  { designation: 'Role 1' },
  { designation: 'Role 2' }
]);
```

## Available Scripts

- `npm run migrate` - Run all pending migrations
- `npm run migrate:undo` - Undo the last migration
- `npm run seed` - Run all seeders
- `npm run seed:undo` - Undo all seeders

## File Structure

```
├── migrations/           # Database schema migrations
├── seeders/             # Data insertion scripts
├── scripts/             # Custom data insertion scripts
├── config/database.js   # Database configuration
└── models/              # Sequelize models
```

## Customizing Data

### Adding New Tables
1. Create a new migration file in `migrations/`
2. Create a new model in `models/`
3. Update the generic insertion script

### Modifying Seed Data
1. Edit the files in `seeders/` directory
2. Or modify the custom scripts in `scripts/` directory

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your MySQL service and credentials
2. **Table Already Exists**: Use `force: false` in sync options
3. **Duplicate Data**: Use `ignoreDuplicates: true` in bulkCreate

### Reset Database
To completely reset your database:

```javascript
// In your script
await sequelize.sync({ force: true }); // WARNING: This will drop all tables!
```

## Best Practices

1. Always backup your database before running migrations
2. Test migrations on a development database first
3. Use transactions for complex data operations
4. Keep migration files version controlled
5. Document any manual database changes

## Example: Adding New Data

To add new designation data, edit `scripts/insert-generic-data.js`:

```javascript
const designations = [
  { designation: 'Software Developer' },
  { designation: 'Senior Software Developer' },
  { designation: 'Team Lead' },
  // Add your new designations here
  { designation: 'New Role' }
];
```

Then run:
```bash
node scripts/insert-generic-data.js
```

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify database connectivity
3. Ensure all dependencies are installed
4. Check that your models are properly defined
