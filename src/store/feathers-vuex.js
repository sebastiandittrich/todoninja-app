import feathersVuex from 'feathers-vuex';
import feathersClient from '@/assets/js/FeathersClient';

const feathers = feathersVuex(feathersClient, { idField: 'id' })

export const service = feathers.service
export const FeathersVuex = feathers.FeathersVuex
export const auth = feathers.auth