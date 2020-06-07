<template>

    <!-- must have a single root element -->
    <div>

        <!-- APP METADATA -->
        <TheHeader 
            v-bind:services="services" />
        
        <!-- SERVICE PING STATUS -->
        <md-progress-spinner 
            v-if="!servicesPinged"
            md-mode="indeterminate">
        </md-progress-spinner>
        
        <!-- WARN USER -->
        <MessageConfiguration
            v-if="servicesPingCompleted && !configured" 
            v-bind:servicesRequiredCount="this.requiredServices.length" />
        
        <!-- BASE COMPONENT -->
        <BaseComponent 
            v-if="servicesPingCompleted && configured"
            v-bind:requiredServices="requiredServices"
            v-bind:services="services" />
        
        <!-- APP DETAILS -->
        <TheFooter />

    </div>

</template>

<script>
    import configuration from "./configuration";
    import BaseComponent from "./components/BaseComponent";
    import MessageConfiguration from "./components/Messages/MessageConfiguration";
    import TheFooter from "./components/TheFooter";
    import TheHeader from "./components/TheHeader";
    
    export default {
        name: "App",
        components: {
            BaseComponent,
            MessageConfiguration,
            TheFooter,
            TheHeader
        },
        data: () => ({
            configured: false,
            onlineServices: [],
            requiredServices: [],
            services: {},
            servicesPinged: false,
            servicesPingCompleted: false
        }),
        beforeMount() {
                         
            // pull services from config
            for (var key in configuration.routes) {
                
                // update state
                this.services[key] = { pinged: false, up: false, data_accessible: false };
                
                // ping service
                this.pingService(key, configuration.routes[key].base + configuration.routes[key].health);
                
                // check if service is required for app to function
                if (configuration.routes[key].required) {
                    
                    // update list
                    this.requiredServices.push(key);
                    
                }

            }

            // update state
            this.servicesPinged = true;
            
            let _self = this;
            
            // slight delay for more intuitive ux
            setTimeout(function() {
                _self.servicesPingCompleted = true;
            }, 2000);
            
        },
        methods: {
            pingService(name, url) {
                
                let _self = this;
                
                // try to ping
                this.axios.get(url)
                    .then(response => {
                    
                        // capture existing state
                        let oldData = Object.assign({}, _self.services);
        
                        // update state
                        _self.onlineServices.push(name);
                        oldData[name] = {
                            up: response.data.status === "pass" ? true : false,
                            pinged: true,
                            data_accessible: response.data.datastore_online
                        };
                    
                        // have to replace entire object or vue won't recognize state change
                        _self.services = oldData;
                        
                        // update configuration
                        this.verifyConfiguration(_self);

                    })
                    .catch(error => {
                        
                        // capture existing state
                        let oldData = Object.assign({}, _self.services);
                                        
                        // update state
                        oldData[name] = { pinged: true, up: false };
                    
                        // have to replace entire object or vue won't recognize state change
                        _self.services = oldData; 
                    
                        // update configuration
                        _self.verifyConfiguration(_self);
                    
                    });
                
            },
            verifyConfiguration(_self) {
                
                // check if configuration is ready
                _self.configured = _self.requiredServices.length === _self.onlineServices.length && _self.requiredServices.sort().every(function(value, index) { return value === _self.onlineServices.sort()[index]});
                
            }
        }
    };
</script>