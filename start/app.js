'use strict'

const path = require('path')

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/redis/providers/RedisProvider',
  path.join(__dirname, '..', 'providers', 'View/provider')
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = ['@adonisjs/lucid/providers/MigrationsProvider']

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  // models
  UserModel: 'App/Models/User',
  PortalborrowModel: 'App/Models/Portalborrow',
  PortalborrowresponseModel: 'App/Models/Portalborrowresponse',
  VotingBoardCandidateModel: 'App/Models/VotingBoardCandidate',
  VotingBoardVoteModel: 'App/Models/VotingBoardVote',
  VotingProposalDCBModel: 'App/Models/VotingProposalDCB',
  VotingProposalGOVModel: 'App/Models/VotingProposalGOV',
  VotingProposalDCBVoteModel: 'App/Models/VotingProposalDCBVote',
  VotingProposalGOVVoteModel: 'App/Models/VotingProposalGOVVote',
  ReserveModel: 'App/Models/Reserve',
  // services
  UserDAO: 'App/DAO/User',
  VotingBoardCandidateDAO: 'App/DAO/VotingBoardCandidate',
  VotingBoardVoteDAO: 'App/DAO/VotingBoardVote',
  VotingProposalDCBDAO: 'App/DAO/VotingProposalDCB',
  VotingProposalGOVDAO: 'App/DAO/VotingProposalGOV',
  VotingProposalDCBVoteDAO: 'App/DAO/VotingProposalDCBVote',
  VotingProposalGOVVoteDAO: 'App/DAO/VotingProposalGOVVote',
  ReserveDAO: 'App/DAO/Reserve',
  // utils
  CommonUtils: 'App/Utilities/CommonUtils',
  ConstantApi: 'App/Utilities/ConstantApi'
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = ['App/Commands/Permission']

module.exports = { providers, aceProviders, aliases, commands }
