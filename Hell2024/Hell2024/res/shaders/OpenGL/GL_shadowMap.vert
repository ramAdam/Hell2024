#version 460 core
layout (location = 0) in vec3 aPos;

struct RenderItem3D {
    mat4 modelMatrix;
    mat4 inverseModelMatrix;
    int meshIndex;
    int baseColorTextureIndex;
    int normalTextureIndex;
    int rmaTextureIndex;
    int vertexOffset;
    int indexOffset;
    int animatedTransformsOffset;
    int castShadow;
    int useEmissiveMask;
    float emissiveColorR;
    float emissiveColorG;
    float emissiveColorB;
};

layout(std430, binding = 12) readonly buffer renderItems {
    RenderItem3D RenderItems[];
};

uniform mat4 shadowMatrices[6];
uniform int faceIndex;

out vec3 FragPos;

void main() {
	mat4 model = RenderItems[gl_InstanceID + gl_BaseInstance].modelMatrix;
	vec4 worldPos = model * vec4(aPos, 1.0);
    FragPos = worldPos.xyz;
    gl_Position = shadowMatrices[faceIndex] * worldPos;
}