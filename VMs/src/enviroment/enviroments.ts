const urlBase = 'https://localhost:';

export const environment = {
    urlBase :  urlBase,
    production: false,
    apiToken: `${urlBase}7183/api/Token`,
    apiListUsers : `${urlBase}7211/api/Users/ListUsers`,
    apiListVMs: `${urlBase}7203/api/VMs/ListVMs`,
    apiListVMsId: `${urlBase}7203/api/VMs/ListVMs/`,
    apiCreateVMs: `${urlBase}7203/api/VMs/CreateVMs`,
    apiUpdateVMs: `${urlBase}7203/api/VMs/UpdateVMs`,
    apiDeleteVMs: `${urlBase}7203/api/VMs/DeleteVMs/`
}