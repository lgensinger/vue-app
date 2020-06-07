<template>

    <!-- WARN USER -->
    <section class="message message-configuration">
        
        <h1>It appears something is misconfigured.</h1>
        
        <h2>This interface is unable to connect to required {{ servicesRequiredCount > 1 ? 'services' : 'service' }}.</h2>
        
        <p>To ensure the service {{ servicesRequiredCount > 1 ? 'routes are' : 'route is' }} properly configured check the specifications in your environment.</p>

    </section>

</template>

<script>            
    export default {
        name: "MessageConfiguration",
        props: ["servicesRequiredCount"]
    };
</script>