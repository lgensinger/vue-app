<template>

    <!-- WARN USER -->
    <section class="message message-datastore">
        
        <h1>Unable to reach datastore.</h1>
        
        <h2>This interface is properly configured to connect to required {{ servicesRequiredCount > 1 ? 'services' : 'service' }}; however one or more of those services are unable to reach an underlying datastore.</h2>
        
        <p>To ensure the service {{ servicesRequiredCount > 1 ? 'routes are' : 'route is' }} properly configured check the specifications in your environment.</p>

    </section>

</template>

<script>            
    export default {
        name: "MessageDatastore",
        props: ["servicesRequiredCount"]
    };
</script>