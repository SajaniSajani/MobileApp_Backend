const express = require('express');
const app = express();
const { sequelize } = require('./config/database');
const Role = require('./models/role');
require('./models/release_type');
require('./models/defect_type');
require('./models/priority');
const Severity = require('./models/severity');
const Defect_status = require('./models/defect_status');
const User = require('./models/user');
const Project = require('./models/project');
const Module = require('./models/modules');
const Email_user = require('./models/email_user');
const Privilege = require('./models/privilege')
const SubModule =  require('./models/sub_module');
const Bench = require('./models/bench')
const smtp_config = require('./models/smtp_config')
const allocate_module = require('./models/allocate_module')
const test_case = require('./models/test_case')
const release = require('./models/release')
const release_test_case = require('./models/release_test_case')
const project_allocation = require('./models/project_allocation')
const project_allocation_history = require('./models/project_allocation_history')
const defect = require('./models/defect')
const defect_history = require('./models/defect_history')
const comment = require('./models/comments')
const group_Privilege = require('./models/group_privilege')
const user_privilege = require('./models/user_privilege')
const project_user_privilege = require('./models/project_user_privilege')
const designationRoutes = require('./routes/designation.routes');
const projectRoutes = require('./routes/project.routes');
const association = require('./models/association');


app.use(express.json());

// Routes
app.use('/api/designations', designationRoutes);
app.use('/api/projects', projectRoutes);

// Welcome route for root
app.get('/', (req, res) => {
  res.send('Database create successfully');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync();
    console.log('Models synced');

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' DB connection failed:', error.message);
    process.exit(1);
  }
})();
