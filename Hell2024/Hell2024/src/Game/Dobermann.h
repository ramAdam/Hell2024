#pragma once
#include "../Common.h"
#include "../Game/AnimatedGameObject.h"
#include "../Pathfinding/Pathfinding2.h"

struct Dobermann {

    glm::vec3 m_initialPosition = glm::vec3(0);
    glm::vec3 m_currentPosition = glm::vec3(0);
    float m_initialRotation = 0;
    float m_currentRotation = 0;
    DobermannState m_initalState;
    DobermannState m_currentState;
    int m_animatedGameObjectIndex = -1;
    float m_speed = 0.090f;
    float m_footstepAudioTimer = 0;
    float m_heatlh = 100;

    Path m_pathToTarget;

    void Init();
    void Update(float deltaTime);
    void TakeDamage();
    void Kill();
    void Revive();
    void CleanUp();
    AnimatedGameObject* GetAnimatedGameObject();

    PxController* m_characterController = nullptr;
    PxShape* m_shape = nullptr;

private:
    void UpdateLay(float deltaTime);
    void UpdateDead(float deltaTime);
    void UpdateKamakazi(float deltaTime);
    void UpdateAudio(float deltaTime);

};