<template>
    <div>
    <!-- Footer -->
   <div  class="card-footer text-muted bg-white text-dark" >
        <b-container fluid class="bv-example-row text-dark">
            <b-row>
                <b-col sm="5" md="6">             
                    <div class="card-body ">
                        <h5 class="card-title">ABOUT US</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <hr>
                    <div class="card-body">
                        <h5 class="card-title">HOT TAG</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <b-button variant="success">#PHUKET</b-button>
                        <b-button variant="warning">#TRAVEL</b-button>
                        <b-button variant="primary">#TOURISM</b-button>
                    </div>     
                </b-col>
                <b-col sm="5" md="6">            
                    <div class="card-body">
                        <h5 class="card-title">POPULAR</h5>
                        <b-media>
                            <b-img src= "../../assets/PTEIHEAD.png" slot="aside" blank blank-color="#ccc" width="120" alt="placeholder" />
                                <h5>Nested Media</h5>
                                <p>
                                    Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                                    congue felis in faucibus.
                                </p>
                        </b-media> 
                        <hr>
                        <b-media>
                            <b-img src="../../assets/radar.png" slot="aside" blank blank-color="#ccc" width="120" alt="placeholder" />
                                <h5>Nested Media</h5>
                                <p>
                                    Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                                    congue felis in faucibus.
                                </p>
                        </b-media> 
                        <hr>
                        <b-media>
                            <b-img src="../../assets/radar.png" slot="aside" blank blank-color="#ccc" width="120" alt="placeholder" />
                                <h5>Nested Media</h5>
                                <p>
                                    Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                                    congue felis in faucibus.
                                </p>
                        </b-media> 
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
    </div>
</template>

<script>
export default {
name :'Footer'
}
</script>

<style scoped>

</style>
