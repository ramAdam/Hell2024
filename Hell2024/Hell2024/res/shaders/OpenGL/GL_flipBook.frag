#version 430 core

out vec4 FragColor;

uniform int       u_FrameIndex;
uniform int       u_CountRaw;
uniform int       u_CountColumn;
uniform float     u_TimeLerp;
layout (binding = 0) uniform sampler2D u_MainTexture;

in vec2 Texcoord;
in vec3 Normal;
in vec3 FragPos;


void main() {

	//discard;
	vec2 sizeTile =  vec2(1.0 / u_CountColumn, 1.0 / u_CountRaw);

	int frameIndex0 =  u_FrameIndex - 1;
	int frameIndex1 = frameIndex0 + 1;
		 
	vec2 tileOffset0 = ivec2(frameIndex0 % u_CountColumn, frameIndex0 / u_CountColumn) * sizeTile;
	vec2 tileOffset1 = ivec2(frameIndex1 % u_CountColumn, frameIndex1 / u_CountColumn) * sizeTile;

	vec4 color0 = texture(u_MainTexture, tileOffset0 + Texcoord * sizeTile);
	vec4 color1 = texture(u_MainTexture, tileOffset1 + Texcoord * sizeTile);
	
	vec3 tint = vec3(1, 1, 1);
	vec4 color = mix(color0, color1, u_TimeLerp) * vec4(tint, 1.0);	
	FragColor = color.rgba;
	//FragColor = vec4(1, 1, 0, 1);
	  
}