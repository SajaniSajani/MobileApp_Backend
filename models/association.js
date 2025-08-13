const { Model } = require('sequelize');
const designation = require('./designation');
const user = require('./User');
const bench = require('./bench');
const project = require('./project');
const Module = require('./modules');
const submodule = require('./sub_module');
const AllocateModule = require('./allocate_module');
const ProjectAllocation = require('./project_allocation');
const Role = require('./role');
const Release = require('./release');
const ReleaseType = require('./release_type');
const TestCase = require('./test_case');
const Severity = require('./severity');
const DefectType = require('./defect_type');
const ReleaseTestCase = require('./release_test_case');
const Defect = require('./defect');
const DefectStatus = require('./defect_status');
const Priority = require('./priority');
const DefectHistory = require('./defect_history');
const Comment = require('./comments');
const EmailUser = require('./email_user');
const GroupPrivilege = require('./group_privilege');
const Privilege = require('./privilege');
const ProjectAllocationHistory = require('./project_allocation_history');
const projectUserPrivilege = require('./project_user_privilege');
const UserPrivilege = require('./user_privilege');
//user
designation.hasMany(user,{
  foreignKey:'designation_id',
});
user.belongsTo(designation, {
  foreignKey: 'designation_id',
});

//bench
user.hasOne(bench,{
  foreignKey:'user_id',
})
bench.belongsTo(user, {
  foreignKey: 'user_id',
});

//project
project.belongsTo(user, {
  foreignKey: 'user_id',
});
user.hasMany(project,{
    foreignKey:'user_id',
});

//module
Module.belongsTo(project, {
  foreignKey: 'project_id',
});
project.hasMany(Module,{
    foreignKey:'project_id',
});

//submodule
submodule.belongsTo(Module, {
  foreignKey: 'module_id',
});
Module.hasMany(submodule,{
   foreignKey:'module_id',
});

//projectAllocation
ProjectAllocation.belongsTo(project, {
     foreignKey: 'project_id', 
});
project.hasMany(ProjectAllocation,{
    foreignKey:'project_id',
});
ProjectAllocation.belongsTo(Role, { 
    foreignKey: 'role_id', 
});
Role.hasMany(ProjectAllocation,{
    foreignKey:'role_id',
});
ProjectAllocation.belongsTo(user, { 
    foreignKey: 'user_id', 
});
user.hasMany(ProjectAllocation,{
    foreignKey:'user_id',
});

//allocatemodule
AllocateModule.belongsTo(user, {
     foreignKey: 'user_id',
});
user.hasMany(AllocateModule,{
    foreignKey:'user_id',
});
AllocateModule.belongsTo(project, { 
    foreignKey: 'project_id', 
});
project.hasMany(AllocateModule,{
    foreignKey:'project_id',
});
AllocateModule.belongsTo(Module, {
     foreignKey: 'modules_id', 
});
Module.hasMany(AllocateModule,{
    foreignKey:'modules_id',
});
AllocateModule.belongsTo(submodule, {
     foreignKey: 'sub_module_id', 
});
submodule.hasMany(AllocateModule,{
    foreignKey:'sub_module_id',
});

//release
Release.belongsTo(project, { 
    foreignKey: 'project_id',
});
project.hasMany(Release,{
    foreignKey:'project_id',
});

Release.belongsTo(ReleaseType, { 
    foreignKey: 'release_type_id',
});

ReleaseType.hasMany(Release,{
    foreignKey:'release_type_id',
});

//testcase
TestCase.belongsTo(project, { 
    foreignKey: 'project_id',
});
project.hasMany(TestCase,{
    foreignKey:'project_id',
});
TestCase.belongsTo(Module, { 
     foreignKey: 'module_id', 
});
Module.hasMany(TestCase,{
    foreignKey:'module_id',
});
TestCase.belongsTo(submodule, {
      foreignKey: 'sub_module_id', 
});
submodule.hasMany(TestCase,{
    foreignKey:'sub_module_id',
});
TestCase.belongsTo(Severity, { 
   foreignKey: 'severity_id',
});
Severity.hasMany(TestCase,{
    foreignKey:'severity_id',
});
TestCase.belongsTo(DefectType, {
     foreignKey: 'type_id',
});
DefectType.hasMany(TestCase,{
    foreignKey:'type_id',
});

//releasetestcase
ReleaseTestCase.belongsTo(user, {
     foreignKey: 'owner_id', 
});
user.hasMany(ReleaseTestCase,{
    foreignKey:'owner_id',
});
ReleaseTestCase.belongsTo(Release, { 
    foreignKey: 'release_id', 
});
Release.hasMany(ReleaseTestCase,{
    foreignKey:'release_id',
});
ReleaseTestCase.belongsTo(TestCase, { 
    foreignKey: 'test_case_id', 
});
TestCase.hasMany(ReleaseTestCase,{
    foreignKey:'test_case_id',
});

//Defect
Defect.belongsTo(user, {
     foreignKey: 'assigned_by', 
     as: 'AssignedBy'
});
user.hasMany(Defect,{
    foreignKey: 'assigned_by',
});
Defect.belongsTo(user, {
     foreignKey: 'assigned_to',
      as: 'AssignedTo' 
});
user.hasMany(Defect,{
    foreignKey: 'assigned_to'
});
Defect.belongsTo(DefectStatus, { 
    foreignKey: 'defect_status_id',  
});
DefectStatus.hasMany(Defect,{
   foreignKey:'defect_status_id',
});
Defect.belongsTo(DefectType, {
     foreignKey: 'type_id',
});
DefectType.hasMany(Defect,{
    foreignKey:'type_id',
});
Defect.belongsTo(Module, { 
    foreignKey: 'modules_id',  
});
Module.hasMany(Defect,{
    foreignKey:'modules_id',
});
Defect.belongsTo(Priority, {
     foreignKey: 'priority_id', 
});
Priority.hasMany(Defect,{
    foreignKey:'priority_id',
});
Defect.belongsTo(project, { 
    foreignKey: 'project_id',
});
project.hasMany(Defect,{
   foreignKey:'project_id',
});
Defect.belongsTo(ReleaseTestCase, { 
    foreignKey: 'release_test_case_id',
});
ReleaseTestCase.hasMany(Defect,{
    foreignKey:'release_test_case_id',
});
Defect.belongsTo(Severity, { 
    foreignKey: 'severity_id', 
});
Severity.hasMany(Defect,{
    foreignKey:'severity_id',
});
Defect.belongsTo(submodule, {
     foreignKey: 'sub_module_id',
});
submodule.hasMany(Defect,{
    foreignKey:'sub_module_id',
});

//DefectHistory
DefectHistory.belongsTo(Defect, {
  foreignKey: 'defect_id',
});
Defect.hasMany(DefectHistory,{
    foreignKey:'defect_id',
});

//comment
Comment.belongsTo(Defect, {
  foreignKey: 'defect_id',
});
Defect.hasMany(Comment,{
    foreignKey:'defect_id',
});

Comment.belongsTo(user, {
  foreignKey: 'user_id',
});
user.hasMany(Comment,{
    foreignKey:'user_id',
});

//Emailuser
EmailUser.belongsTo(user, {
  foreignKey: 'user_id',
});
user.hasMany(EmailUser,{
    foreignKey:'user_id',
});

GroupPrivilege.belongsTo(Privilege, {
  foreignKey: 'privilege_id',
});
Privilege.hasMany(GroupPrivilege,{
    foreignKey:'privilege_id',
});

GroupPrivilege.belongsTo(Role, {
  foreignKey: 'role_id',
});
Role.hasMany(GroupPrivilege,{
    foreignKey:'role_id',
});

//ProjectAllocationHistory
ProjectAllocationHistory.belongsTo(project, { 
    foreignKey: 'project_id', 
});
project.hasMany(ProjectAllocationHistory,{
    foreignKey:'project_id',
});
ProjectAllocationHistory.belongsTo(Role, {
     foreignKey: 'role_id',
});
Role.hasMany(ProjectAllocationHistory,{
    foreignKey:'role_id',
});
ProjectAllocationHistory.belongsTo(user, {
     foreignKey: 'user_id', 
});
user.hasMany(ProjectAllocationHistory,{
    foreignKey:'user_id',
});

//ProjectUserPrivilege
projectUserPrivilege.belongsTo(Privilege, {
  foreignKey: 'privilege_id',
});
Privilege.hasMany(projectUserPrivilege,{
    foreignKey:'privilege_id',
});

projectUserPrivilege.belongsTo(project, {
  foreignKey: 'project_id',
});
project.hasMany(projectUserPrivilege,{
    foreignKey:'project_id',
});

projectUserPrivilege.belongsTo(user, {
  foreignKey: 'user_id',
});
user.hasMany(projectUserPrivilege,{
    foreignKey:'user_id',
});

//UserPrivilege
UserPrivilege.belongsTo(Privilege, {
  foreignKey: 'privilege_id',
});
Privilege.hasMany(UserPrivilege,{
    foreignKey:'privilege_id',
});

UserPrivilege.belongsTo(project, {
  foreignKey: 'project_id',
});
project.hasMany(UserPrivilege,{
    foreignKey:'project_id',
});

UserPrivilege.belongsTo(user, {
  foreignKey: 'user_id',
});
user.hasMany(UserPrivilege,{
    foreignKey:'user_id',
});

module.exports =  {
    designation,
    user,
    bench,
    project,
    Module,
    submodule,
    AllocateModule,
    ProjectAllocation,
    Role,
    Release,
    ReleaseType,
    TestCase,
    Severity,
    DefectType,
    ReleaseTestCase,
    Defect,
    DefectStatus,
    Priority,
    DefectHistory,
    Comment,
    EmailUser,
    GroupPrivilege,
    Privilege,
    ProjectAllocationHistory,
    projectUserPrivilege,
    UserPrivilege,
    

} ;