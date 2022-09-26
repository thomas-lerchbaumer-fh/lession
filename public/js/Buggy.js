import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

class Buggy{
   
    constructor(scene,name){
        this.buggy
        
        this.speed = 0
        this.direction = 0
        this.steer = 0

        this.scene = scene
        console.log("Buggy created")
        this.loadBuggy()

        document.addEventListener('keydown',(event) =>{
            let key = event.key
            if(key == 'w'){
                this.speed = 1
            }else if (key == 'a'){
                this.steer = -1
            }else if (key == 's'){
                this.speed = -1
            }else if (key == 'd'){
                this.steer = 1
            }

                })

        document.addEventListener('keyup',(event) =>{
            let key = event.key
            if(key == 'w'){
                this.speed = 0
            }else if (key == 'a'){
                this.steer = 0
            }else if (key == 's'){
                this.speed = 0
            }else if (key == 'd'){
                this.steer = 0
            }
        
                })       
    }

    animate(){
        this.direction += this.steer * 0.1
        let dx = Math.sin(this.direction) * this.speed * 1.5
        let dz = Math.cos(this.direction) * this.speed * 1.5

        if(this.buggy){
            this.buggy.rotation.y = this.direction - Math.PI/2

            this.buggy.position.x += dx
            this.buggy.position.z += dz
        }

    }

    loadBuggy(){
        const loader = new GLTFLoader()
        loader.load('./assets/models/buggy.glb',(gltf) => {
            gltf.scene.scale.x = 0.01
            gltf.scene.scale.y = 0.01
            gltf.scene.scale.z = 0.01
            this.scene.add(gltf.scene)

            this.buggy = gltf.scene
            console.log("buggy loaded",gltf)
        },function (xhr){
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
        ,function (error){
            console.log( 'An error happened' )
        }
    })
    }

}

export {Buggy}