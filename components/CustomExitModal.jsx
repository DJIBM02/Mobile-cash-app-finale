import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const CustomExitModal = ({ visible, onClose, onExit }) => {
  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={visible}
      onRequestClose={onClose}
    >
      <View className='flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]'>
        <View className='w-72 bg-[#161622] rounded-lg p-5 items-center'>
          <Text className='text-2xl font-bold text-[#32cd32] mb-3'>
            Exit App
          </Text>
          <Text className='text-base text-[#CDCDE0] text-center mb-5'>
            Are you sure you want to exit?
          </Text>
          <View className='flex-row justify-between w-full'>
            <TouchableOpacity
              className='flex-1 py-2 items-center rounded bg-gray-700'
              onPress={onClose}
            >
              <Text className='text-base text-[#32cd32]'>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-1 py-2 items-center rounded bg-[#d32f2f] ml-2'
              onPress={onExit}
            >
              <Text className='text-base text-white'>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomExitModal;
