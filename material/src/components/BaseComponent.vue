<template>
    
    <main>
        
        <!-- WARN USER -->
        <MessageDatastore
            v-if="servicesDataAccessible.length === 0" 
            v-bind:servicesRequiredCount="servicesRequiredCount" />
        
        <!-- CONTENT -->
        <p>Custom Content</p>

    </main>

</template>

<script>    
    import MessageDatastore from "./Messages/MessageDatastore";
    
    export default {
        name: "BaseComponent",
        props: ["requiredServices", "services"],
        components: {
            MessageDatastore
        },
        data: () => ({
            servicesDataAccessible: false
        }),
        mounted() {
            
            let _self = this;
            
            // determine if any datastore is accessible from online services
            this.servicesDataAccessible = Object.keys(_self.services).filter(function(d) {
                return _self.services[d].up;
            }).filter(function(d) {
                return _self.services[d].data_accessible;
            });
            
        }
    };
</script>